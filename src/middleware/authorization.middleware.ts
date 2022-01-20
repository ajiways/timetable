import express from "express";
import jwt from "jsonwebtoken";
import { configService } from "../services/config.service";

declare global {
   namespace Express {
      interface Request {
         user: string | jwt.JwtPayload;
      }
   }
}

export function authMiddleware(req: express.Request, res: express.Response, next: Function) {
   if (req.method === "OPTIONS") {
      next();
   }

   try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
         return res.status(403).json({ message: "Пользователь не авторизирован" });
      }
      const decodedData = jwt.verify(token, configService.secret);
      req.user = decodedData;
      next();
   } catch (error) {
      console.log((error as Error).message);
      return res.status(403).json({ message: "Пользователь не авторизирован" });
   }
}
