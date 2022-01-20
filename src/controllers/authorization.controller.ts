import { AuthorizationService } from "../services/authorization.service";
import express from "express";
import { User } from "../entities/user.entity";

export class AuthorizationController {
   private readonly authorizationService: AuthorizationService;

   constructor(authorizationService: AuthorizationService) {
      this.authorizationService = authorizationService;
   }

   async login(req: express.Request, res: express.Response): Promise<string> {
      try {
         res.status(200);
         return await this.authorizationService.login(req.body.username, req.body.password);
      } catch (error) {
         res.status(400);
         return (error as Error).message;
      }
   }

   async registration(req: express.Request, res: express.Response): Promise<User | string> {
      try {
         res.status(201);
         return await this.authorizationService.register(
            req.body.username,
            req.body.password,
            req.body.confirm
         );
      } catch (error) {
         res.status(400);
         return (error as Error).message;
      }
   }
}
