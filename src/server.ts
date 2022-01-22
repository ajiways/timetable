import express, { RequestHandler } from "express";
import http from "http";
import { Connection, createConnection } from "typeorm";
import { getOrmConfig } from "./config/typeorm";
import { EMethod, ServerInterface, THandler, validationArray } from "./interfaces/server.interface";
import { configService } from "./services/config.service";
import cookieParser from "cookie-parser";
import cors from "cors";
import { validationResult } from "express-validator";

export class ServerInstance implements ServerInterface {
   private readonly app: express.Application;
   private connection: http.Server | null;
   private dbConnection: Connection | null;
   private readonly port: number;

   constructor() {
      this.port = configService.port;
      this.app = express();
      this.app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(cookieParser());
   }

   connect(): Promise<void> {
      return new Promise((resolve) => {
         this.app.listen(this.port, resolve);
         console.log(`Server has been started on ${this.port}`);
      });
   }

   disconnect(): Promise<void> {
      return new Promise((resolve, reject) => {
         if (this.connection) {
            this.connection.close((err) => {
               if (err) {
                  reject(err);
               } else {
                  console.log("Server has been shut down");
                  resolve();
               }
            });
         }
      });
   }

   addHandler(method: EMethod, route: string, handler: THandler, middlewares?: validationArray): void {
      switch (method) {
         case "GET":
            if (middlewares) {
               this.app.get(route, ...middlewares, async (req: express.Request, res: express.Response) => {
                  const result = await handler(req, res);
                  res.json(result);
               });
            } else {
               this.app.get(route, async (req, res) => {
                  const result = await handler(req, res);
                  res.json(result);
               });
            }
            return;
         case "POST":
            if (middlewares) {
               this.app.post(route, ...middlewares, async (req: express.Request, res: express.Response) => {
                  const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                     const err = errors.array();
                     res.status(422).json({ errors: err });
                     return;
                  }
                  const result = await handler(req, res);
                  res.json(result);
               });
            } else {
               this.app.post(route, async (req, res) => {
                  const result = await handler(req, res);
                  res.json(result);
               });
            }
            return;
         case "PUT":
            if (middlewares) {
               this.app.put(route, ...middlewares, async (req: express.Request, res: express.Response) => {
                  const result = await handler(req, res);
                  res.json(result);
               });
            } else {
               this.app.put(route, async (req, res) => {
                  const result = await handler(req, res);
                  res.json(result);
               });
            }
            return;
         case "DELETE":
            if (middlewares) {
               this.app.delete(route, ...middlewares, async (req: express.Request, res: express.Response) => {
                  const result = await handler(req, res);
                  res.json(result);
               });
            } else {
               this.app.delete(route, async (req, res) => {
                  const result = await handler(req, res);
                  res.json(result);
               });
            }
            return;
      }
   }

   addRouter(route: string, router: express.Router): void {
      this.app.use(route, router);
   }

   async connectToDB(): Promise<void> {
      this.dbConnection = await createConnection(getOrmConfig());
      console.log("Postgres connected");
   }

   getDBConnection(): Connection {
      if (this.dbConnection) {
         return this.dbConnection;
      } else {
         throw new Error("Нет подключения БД");
      }
   }
}
