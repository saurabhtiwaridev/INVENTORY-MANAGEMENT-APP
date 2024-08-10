export const lastTimeVistMiddleware = (req, res, next) => {
  if (req.cookies.lastTimeVist) {
    res.locals.lastTimeVist = new Date(
      req.cookies.lastTimeVist
    ).toLocaleString();
  }

  res.cookie("lastTimeVist", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  next();
};
