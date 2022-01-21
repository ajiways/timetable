import { Role } from "../../entities/role.entity";
import { User } from "../../entities/user.entity";

export class UserDTO {
   readonly username: string;
   readonly password: string;
   readonly roles: Role[];
   readonly id: number;

   constructor(model: User) {
      this.username = model.username;
      this.password = model.password;
      this.roles = model.roles;
      this.id = model.id;
   }
}
