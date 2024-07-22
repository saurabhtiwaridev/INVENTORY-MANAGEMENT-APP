import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProduct(req, res) {
    const products = ProductModel.get();

    return res.render("products", { products });

    // return res.sendFile(
    //   path.join(path.resolve(), "src/views", "products.html")
    // );
  }
}
