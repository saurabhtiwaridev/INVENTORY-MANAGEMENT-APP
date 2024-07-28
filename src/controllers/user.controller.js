import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {
  getRegistartionView(req, res) {
    return res.render("new-user");
  }

  postRegistration(req, res) {
    const { email, username, password } = req.body;
    UserModel.setUser(email, username, password);
    return res.render("login");
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const isUserMatch = UserModel.checkUserMatch(email, password);
    const products = ProductModel.get();
    if (isUserMatch) {
      req.session.userEmail = email;
      return res.render("product", {
        products: products,
        userEmail: req.session.userEmail,
      });
    } else {
      return res.render("new-user");
    }
  }

  getLoginView(req, res) {
    return res.render("login");
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        return res.redirect("/login");
      }
    });
  }
}
