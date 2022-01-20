import { AuthorizationService } from "../services/authorization.service";
import express from "express";
import { User } from "../entities/user.entity";

export class AuthorizationController {
   private readonly authorizationService: AuthorizationService;

   constructor(authorizationService: AuthorizationService) {
      this.authorizationService = authorizationService;
   }

   async login(req: express.Request): Promise<string> {
      try {
         return await this.authorizationService.login(req.body.username, req.body.password);
      } catch (error) {
         return (error as Error).message;
      }
   }

   async registration(req: express.Request): Promise<User> {
      return await this.authorizationService.register(req.body.username, req.body.password);
   }
}
