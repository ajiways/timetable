import { body, ValidationChain } from "express-validator";

export const registrationValidatorMiddleware: ValidationChain[] = [
   body("username", "Поле username заполнено неправильно")
      .isAlphanumeric("en-US")
      .withMessage("Только английские буквы.")
      .isLength({ min: 6, max: 16 })
      .withMessage("Минимум 6, максимум 16 символа.")
      .trim(),
   body("password", "Поле password заполнено неправильно")
      .isAlphanumeric("en-US")
      .withMessage("Только английские буквы.")
      .isLength({ min: 8, max: 16 })
      .withMessage("Минимум 8, максимум 16 символа")
      .trim(),
   body("confirm", "Поле confirm заполнено неправильно")
      .isAlphanumeric("en-US")
      .withMessage("Только английские буквы")
      .isLength({ min: 8, max: 16 })
      .withMessage("Минимум 8, максимум 16 символа")
      .trim(),
];
