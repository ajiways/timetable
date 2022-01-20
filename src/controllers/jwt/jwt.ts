import jwt from "jsonwebtoken";
import { Role } from "../../entities/role.entity";
import { configService } from "../../services/config.service";

export const generateAccessToken = (id: string, roles: Role[]) => {
   const payload = {
      id,
      roles,
   };
   return jwt.sign(payload, configService.secret, { expiresIn: "24h" });
};
