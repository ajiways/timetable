import { AuthorizationController } from "../controllers/authorization.controller";
import { EMethod } from "../interfaces/server.interface";
import { serverInstance } from "../main";
import { loginValidatorMiddleware } from "../middleware/loginValidator.middleware";
import { registrationValidatorMiddleware } from "../middleware/registrationValidator.middleware";
import { AuthorizationService } from "../services/authorization.service";

export function authorizationRouter(): void {
   const provider = serverInstance.getDBConnection();
   const authorizationService = new AuthorizationService(provider);
   const authorizationController = new AuthorizationController(authorizationService);

   serverInstance.addHandler(
      EMethod.POST,
      "/auth/registration",
      authorizationController.registration.bind(authorizationController),
      [registrationValidatorMiddleware]
   );

   serverInstance.addHandler(
      EMethod.POST,
      "/auth/login",
      authorizationController.login.bind(authorizationController),
      [loginValidatorMiddleware]
   );
}
