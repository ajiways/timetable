import jwt from "jsonwebtoken";
import { TokenEntity } from "../entities/token.entity";
import { User } from "../entities/user.entity";
import { configService } from "./config.service";
import { UserDTO } from "./dto/user.dto";

declare module "jsonwebtoken" {
   export interface id extends JwtPayload {
      id: number;
   }
}

class TokensService {
   generateTokens(payload: UserDTO) {
      const accessToken = jwt.sign(payload, configService.secret, { expiresIn: "30s" });
      const resreshToken = jwt.sign(payload, configService.refreshSecret, { expiresIn: "30d" });
      console.log("GENERATE TOKENS");
      return {
         accessToken,
         resreshToken,
      };
   }

   validateAccessToken(token: unknown): jwt.id | null {
      try {
         const decodedData = <jwt.id>jwt.verify(String(token), configService.secret);
         console.log("VALIDATE ACCESS");
         return decodedData;
      } catch (error) {
         console.log("VALIDATE ACCESS NULL");
         return null;
      }
   }

   validateRefreshToken(token: unknown): jwt.id | null {
      try {
         const decodedData = <jwt.id>jwt.verify(String(token), configService.refreshSecret);
         console.log("VALIDATE REFRESH");
         return decodedData;
      } catch (error) {
         console.log(error);
         console.log("VALIDATE REFRESH NULL");
         return null;
      }
   }

   async findToken(refreshToken: unknown) {
      const tokenData = await TokenEntity.findOne({ refreshToken: String(refreshToken) });
      console.log("FIND TOKEN");
      if (!tokenData) {
         throw new Error("Ошибка сервера (токен)");
      }
      return tokenData;
   }

   async saveToken(userId: number, refreshToken: string) {
      const tokenData = await TokenEntity.findOne({ where: { user: userId } });
      console.log("SAVE TOKEN");
      if (tokenData) {
         tokenData.refreshToken = refreshToken;
         return await tokenData.save();
      }
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
         throw new Error("Ошибка сервера");
      }

      const token = new TokenEntity();
      token.user = user;
      token.refreshToken = refreshToken;
      return await token.save();
   }
}

export default new TokensService();
