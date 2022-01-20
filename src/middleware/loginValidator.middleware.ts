import { body, ValidationChain } from "express-validator";

export const loginValidatorMiddleware: ValidationChain[] = [
   body("username", "Поле username заполнено неправильно.")
      .isLength({ min: 6, max: 16 })
      .withMessage("Минимум 6, максимум 16")
      .isAlphanumeric("en-US")
      .withMessage("Только английские буквы")
      .trim(),
   body("password")
      .isAlphanumeric("en-US")
      .withMessage("Только английские буквы")
      .isLength({ min: 8, max: 16 })
      .withMessage("Минимум 8, максимум 16 символа."),
];
