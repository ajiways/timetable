import express, { RequestHandler } from "express";
import { Connection } from "typeorm";

export enum EMethod {
   GET = "GET",
   POST = "POST",
   PUT = "PUT",
   DELETE = "DELETE",
}

export type THandler = (request: express.Request) => Promise<unknown>;

export interface ServerInterface {
   connect(): Promise<void>;

   disconnect(): Promise<void>;

   connectToDB(): Promise<void>;

   addHandler(method: EMethod, route: string, handler: THandler, middlewares?: RequestHandler[]): void;

   addRouter(route: string, router: express.Router): void;

   getDBConnection(): Connection;
}
