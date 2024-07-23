import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProduct(req, res) {
    const products = ProductModel.get();

    return res.render("product", { products });

    // return res.sendFile(
    //   path.join(path.resolve(), "src/views", "products.html")
    // );
  }

  getNewProductView(req, res) {
    return res.render("new-product");
  }

  addNewProduct(req, res) {
    ProductModel.add(req.body);
    const products = ProductModel.get();
    return res.render("product", { products });
  }
}
