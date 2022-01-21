import { Connection, Repository } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import tokenService from "./tokens.service";
import { Role, roleType } from "../entities/role.entity";
import { UserDTO } from "./dto/user.dto";

export class AuthorizationService {
   private readonly authorizationRepository: Repository<User>;
   private readonly roleRepository: Repository<Role>;

   constructor(dataProvider: Connection) {
      this.authorizationRepository = dataProvider.getRepository(User);
      this.roleRepository = dataProvider.getRepository(Role);
   }

   async login(username: string, password: string): Promise<Record<string, string | UserDTO>> {
      const candidate = await this.authorizationRepository.findOne({ username });
      if (!candidate) {
         throw new Error("Пользователь с такими данными не найден!");
      }

      const compare = bcrypt.compareSync(password, candidate.password);
      if (!compare) {
         throw new Error("Неправильный пароль!");
      }
      const userDto = new UserDTO(candidate);
      const token = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(candidate.id, token.resreshToken);

      return {
         ...token,
         user: userDto,
      };
   }

   async register(
      username: string,
      password: string,
      confirm: string
   ): Promise<Record<string, string | UserDTO>> {
      if (password !== confirm) {
         throw new Error("Пароли не совпадают!");
      }

      const candidate = await this.authorizationRepository.findOne({ where: { username } });

      if (candidate) {
         throw new Error("Пользователь с таким username уже зарегистрирован!");
      }

      const hashedPassword = await bcrypt.hash(password, 7);

      const user = new User();

      const defaultRole = await this.roleRepository.findOne({ type: roleType.USER });

      if (!defaultRole) {
         throw new Error("Ошибка сервера (роли)");
      }

      user.roles = [defaultRole];
      user.username = username;
      user.password = hashedPassword;

      if (!defaultRole) {
         throw new Error("Ошибка сервера, роль не найдена");
      }

      const userDto = new UserDTO(user);

      await user.save();
      console.log(user);

      const token = tokenService.generateTokens({ ...userDto });
      console.log(token);
      await tokenService.saveToken(user.id, token.resreshToken);

      return {
         ...token,
         user: userDto,
      };
   }

   async refresh(refreshToken: unknown): Promise<Record<string, string | UserDTO>> {
      if (!refreshToken) {
         throw new Error("Пользователь не авторизован");
      }
      const decodedData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDB = await tokenService.findToken(refreshToken);

      if (!decodedData || !tokenFromDB) {
         throw new Error("Пользователь не авторизован");
      }
      console.log("REFRESH");
      const user = await this.authorizationRepository.findOne({ where: { id: Number(decodedData.id) } });

      if (!user) {
         throw new Error("Ошибка сервера (refresh)");
      }

      const userDto = new UserDTO(user);
      const token = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(user.id, token.resreshToken);
      console.log("REFRESH TO CLIENT");
      return {
         ...token,
         user: userDto,
      };
   }
}
