import { body, validationResult } from "express-validator";

export default async function validateRequest(req, res, next) {
  // Express Validation setup

  // 1. setup the rules

  const rules = [
    body("name").isEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be positive integer"),
    body("url").isURL().withMessage("url should be valid"),
  ];

  // 2. run those rules

  // these rules may include I/O operations so we should use promise to runing the rule

  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. check for error if it has

  let valditionErrors = validationResult(req);
  if (!valditionErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: valditionErrors.array()[0].msg,
    });
  }
  next();
}
