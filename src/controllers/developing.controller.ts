import { User } from "../entities/user.entity";
import { DevelopingService } from "../services/developing.service";
import express from "express";

export class DevelopingController {
   private readonly developingService: DevelopingService;

   constructor(developingService: DevelopingService) {
      this.developingService = developingService;
   }

   async getAllUsers(): Promise<User[]> {
      return this.developingService.getAllUsers();
   }

   async getUserInfo(
      request: express.Request
   ): Promise<string | Record<string, string | User | Record<string, string>>> {
      return await this.developingService.getUserInfo(request);
   }
}
