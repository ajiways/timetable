import { AuthorizationService } from "../services/authorization.service";
import express from "express";
import { User } from "../entities/user.entity";
import { UserDTO } from "../services/dto/user.dto";

export class AuthorizationController {
   private readonly authorizationService: AuthorizationService;

   constructor(authorizationService: AuthorizationService) {
      this.authorizationService = authorizationService;
   }

   async login(
      req: express.Request,
      res: express.Response
   ): Promise<Record<string, string | UserDTO> | string> {
      try {
         const userData = await this.authorizationService.login(req.body.username, req.body.password);

         res.status(200);
         res.cookie("refreshToken", userData.resreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         });
         return userData;
      } catch (error) {
         res.status(400);
         return (error as Error).message;
      }
   }

   async registration(
      req: express.Request,
      res: express.Response
   ): Promise<Record<string, string | UserDTO> | string> {
      try {
         res.status(201);
         const userData = await this.authorizationService.register(
            req.body.username,
            req.body.password,
            req.body.confirm
         );
         res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         });
         return userData;
      } catch (error) {
         res.status(400);
         return (error as Error).message;
      }
   }

   async refresh(
      req: express.Request,
      res: express.Response
   ): Promise<string | Record<string, string | UserDTO>> {
      try {
         const { refreshToken } = req.cookies;
         const userData = await this.authorizationService.refresh(refreshToken);
         console.log(userData);
         res.cookie("refreshToken", userData.resreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         });
         return userData;
      } catch (error) {
         res.status(400);
         return (error as Error).message;
      }
   }
}
