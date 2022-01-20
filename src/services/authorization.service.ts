import { Connection, Repository } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { generateAccessToken } from "../controllers/jwt/jwt";
import { Role, roleDescription, roleType } from "../entities/role.entity";

export class AuthorizationService {
   private readonly authorizationRepository: Repository<User>;
   private readonly roleRepository: Repository<Role>;

   constructor(dataProvider: Connection) {
      this.authorizationRepository = dataProvider.getRepository(User);
      this.roleRepository = dataProvider.getRepository(Role);
   }

   async login(username: string, password: string): Promise<string> {
      const candidate = await this.authorizationRepository.findOne({ username });
      if (!candidate) {
         throw new Error("Пользователь с такими данными не найден!");
      }

      const compare = bcrypt.compareSync(password, candidate.password);
      if (!compare) {
         throw new Error("Неправильный пароль!");
      }

      const userRoles = await this.roleRepository.find({ where: { id: candidate.id } });
      const token = generateAccessToken(String(candidate.id), userRoles);
      return token;
   }

   async register(username: string, password: string): Promise<User> {
      const candidate = await this.authorizationRepository.find({ where: { username } });

      if (candidate) {
         throw new Error("Пользователь с таким username уже зарегистрирован!");
      }

      const hashedPassword = await bcrypt.hash(password, 7);
      const user = this.authorizationRepository.create({ username, password: hashedPassword });

      user.role.type = roleType.USER;
      user.role.description = roleDescription.USERDESC;

      return await user.save();
   }
}
