import { configService } from "../services/config.service";
import jwt from "jsonwebtoken";
import express from "express";

export function roleMiddleware(role: string) {
   return function (req: express.Request, res: express.Response, next: Function) {
      if (req.method === "OPTIONS") {
         next();
      }

      try {
         const token = req.headers.authorization?.split(" ")[1];
         if (!token) {
            return res.status(403).json({ message: "Пользователь не авторизирован" });
         }

         const { roles } = Object(jwt.verify(token, configService.secret));

         let hasRole: boolean = false;

         roles.forEach((item: Record<string, string>) => {
            if (item.type === role) {
               hasRole = true;
            }
         });

         if (!hasRole) {
            return res.status(403).json({ message: "У вас нет прав!" });
         }

         next();
      } catch (error) {
         console.log((error as Error).message);
         return res.status(403).json({ message: "Пользователь не авторизирован" });
      }
   };
}
