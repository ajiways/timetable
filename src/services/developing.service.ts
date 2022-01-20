import { User } from "../entities/user.entity";
import { Connection, Repository } from "typeorm";

export class DevelopingService {
   private readonly authorizationRepository: Repository<User>;

   constructor(dataProvider: Connection) {
      this.authorizationRepository = dataProvider.getRepository(User);
   }

   async getAllUsers(): Promise<User[]> {
      return await this.authorizationRepository.find();
   }
}
