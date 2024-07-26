import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import productController from "./src/controllers/product.controller.js";
import validateRequest from "./src/middlewares/validation.middleware.js";
const port = 3100;

const app = express();

app.use(express.static("public"));

// for parsing the form body

app.use(express.urlencoded({ extended: true }));

// for configuring the view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));

// for layout our views
app.use(expressEjsLayouts);

const productControllerClass = new productController();

app.use(express.static("src/views"));

app.get("/", productControllerClass.getProduct);
app.get("/new", productControllerClass.getNewProductView);
app.get("/update-product/:id", productControllerClass.getUpdateProductView);
app.post("/", validateRequest, productControllerClass.addNewProduct);
app.post("/update-product", productControllerClass.updateProduct);

app.post("/delete-product/:id", productControllerClass.deleteProduct);

app.listen(port, () => {
  console.log("server is up & listening on port", port);
});
