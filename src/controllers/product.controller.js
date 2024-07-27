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
    return res.render("new-product", { errorMessage: null });
  }

  addNewProduct(req, res) {
    const { name, desc, price } = req.body;
    const imageUrl = path.join("images", req.file.filename);
    ProductModel.add(name, desc, price, imageUrl);
    const products = ProductModel.get();
    return res.render("product", { products });
  }

  getUpdateProductView(req, res) {
    const { id } = req.params;
    const productFound = ProductModel.getById(id);

    if (productFound) {
      return res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    } else {
      return res.status(201).send("Product not found with given id");
    }
  }

  updateProduct(req, res) {
    const { id, name, desc, price } = req.body;
    const filename = req.file.filename;
    const queryObject = {
      id: id,
      name: name,
      desc: desc,
      price: price,
      imageUrl: path.join("images", filename),
    };
    ProductModel.update(queryObject);
    const products = ProductModel.get();

    return res.render("product", { products });
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      ProductModel.deleteProduct(id);
      const productUpdated = ProductModel.get();
      return res.render("product", { products: productUpdated });
    } else {
      return res
        .status(401)
        .send("can not delete this product, id does not exist to the db");
    }
  }
}
