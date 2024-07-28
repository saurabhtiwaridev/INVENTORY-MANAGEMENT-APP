import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import productController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/upload-file.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";

const port = 3100;

const app = express();

app.use(express.static("public"));

app.use(
  session({
    secret: "BlahBlah",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

// for parsing the form body

app.use(express.urlencoded({ extended: true }));

// for configuring the view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));

// for layout our views
app.use(expressEjsLayouts);

const productControllerClass = new productController();
const usersControllerClass = new UserController();

app.use(express.static("src/views"));

app.get("/registration", usersControllerClass.getRegistartionView);
app.get("/login", usersControllerClass.getLoginView);
app.get("/logout", usersControllerClass.logout);
app.post("/registration", usersControllerClass.postRegistration);
app.post("/login", usersControllerClass.postLogin);

app.get("/", auth, productControllerClass.getProduct);
app.get("/new", auth, productControllerClass.getNewProductView);
app.get(
  "/update-product/:id",
  auth,
  productControllerClass.getUpdateProductView
);
app.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validateRequest,
  productControllerClass.addNewProduct
);
app.post(
  "/update-product",
  auth,
  uploadFile.single("imageUrl"),
  productControllerClass.updateProduct
);

app.post("/delete-product/:id", auth, productControllerClass.deleteProduct);

app.listen(port, () => {
  console.log("server is up & listening on port", port);
});
