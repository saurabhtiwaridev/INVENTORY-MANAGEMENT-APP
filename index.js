import express from "express";
import productController from "./src/controllers/products.controller.js";
const port = 3100;

const app = express();
const productControllerClass = new productController();

app.use(express.static("src/views"));

app.get("/", productControllerClass.getProduct);

app.listen(port, () => {
  console.log("server is up & listening on port", port);
});
