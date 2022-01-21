import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { configService } from "../services/config.service";
import tokensService from "../services/tokens.service";

declare global {
   namespace Express {
      interface Request {
         user: User;
      }
   }
}

export async function authMiddleware(req: express.Request, res: express.Response, next: Function) {
   if (req.method === "OPTIONS") {
      next();
   }

   try {
      const token = req.headers.authorization?.split(" ")[1];

      const decodedData = tokensService.validateAccessToken(token);

      if (!token || !decodedData) {
         return res.status(403).json({ message: "Пользователь не авторизирован" });
      }

      const user = await User.findOne({ where: { id: decodedData.id } });

      if (!user) {
         return res.status(403).json({ message: "Пользователь не авторизирован" });
      }

      req.user = user;
      console.log("AUTH SUCCESS");
      next();
   } catch (error) {
      console.log((error as Error).message);
      console.log("AUTH FAILURE");
      return res.status(403).json({ message: "Пользователь не авторизирован" });
   }
}
