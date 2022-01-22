import { User } from "../entities/user.entity";
import { Connection, Repository } from "typeorm";
import express from "express";

export class DevelopingService {
   private readonly authorizationRepository: Repository<User>;

   constructor(dataProvider: Connection) {
      this.authorizationRepository = dataProvider.getRepository(User);
   }

   async getAllUsers(): Promise<User[]> {
      return await this.authorizationRepository.find();
   }

   async getUserInfo(request: express.Request) {
      console.log("GET USER INFO");
      const user = await this.authorizationRepository.findOne({ where: { id: request.user.id } });

      if (!user) {
         return "Ошибка дев запроса";
      }

      return {
         userdata: user,
         pars: [
            {
               name: "Name Para 1",
               teacher: "Teacher Para 1",
               time: "8:00 - 10:00",
            },
            {
               name: "Name Para 2",
               teacher: "Teacher Para 2",
               time: "11:00 - 13:00",
            },
            {
               name: "Name Para 3",
               teacher: "Teacher Para 3",
               time: "14:00 - 16:00",
            },
         ],
      };
   }
}
