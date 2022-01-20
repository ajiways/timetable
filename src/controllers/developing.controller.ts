import { User } from "../entities/user.entity";
import { DevelopingService } from "../services/developing.service";

export class DevelopingController {
   private readonly developingService: DevelopingService;

   constructor(developingService: DevelopingService) {
      this.developingService = developingService;
   }

   async getAllUsers(): Promise<User[]> {
      return this.developingService.getAllUsers();
   }
}
