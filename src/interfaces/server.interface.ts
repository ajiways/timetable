import express, { RequestHandler } from "express";
import { ValidationChain } from "express-validator";
import { Connection } from "typeorm";

export enum EMethod {
   GET = "GET",
   POST = "POST",
   PUT = "PUT",
   DELETE = "DELETE",
}

export type THandler = (request: express.Request, response: express.Response) => Promise<unknown>;
export type validationArray = Array<RequestHandler | ValidationChain[]>;

export interface ServerInterface {
   connect(): Promise<void>;

   disconnect(): Promise<void>;

   connectToDB(): Promise<void>;

   addHandler(
      method: EMethod,
      route: string,
      handler: THandler,
      // middlewares?: RequestHandler[] | ValidationChain[]
      middlewares?: validationArray
   ): void;

   addRouter(route: string, router: express.Router): void;

   getDBConnection(): Connection;
}
