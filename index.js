import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import productController from "./src/controllers/product.controller.js";
const port = 3100;

const app = express();

// for parsing the form body

app.use(express.urlencoded());

// for configuring the view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/views"));

// for layout our views
app.use(expressEjsLayouts);

const productControllerClass = new productController();

app.use(express.static("src/views"));

app.get("/", productControllerClass.getProduct);
app.get("/new", productControllerClass.getNewProductView);
app.post("/", productControllerClass.addNewProduct);

app.listen(port, () => {
  console.log("server is up & listening on port", port);
});
