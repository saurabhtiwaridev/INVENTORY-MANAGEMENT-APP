export default function validateRequest(req, res, next) {
  const { name, price, imageUrl } = req.body;
  let error = [];

  if (!name || name.trim() == "") {
    error.push("name can not be set empty");
  }

  if (!price || parseFloat(price) < 1) {
    error.push("price should be postive integer only");
  }

  try {
    new URL(imageUrl);
  } catch (err) {
    error.push("url should be valid only");
  }

  if (error.length) {
    return res.render("new-product", { erorMessage: error[0] });
  }
  next();
}
