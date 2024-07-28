export const auth = (req, res, next) => {
  const userEmail = req.session.userEmail;

  if (userEmail) {
    next();
  } else {
    return res.redirect("/login");
  }
};
