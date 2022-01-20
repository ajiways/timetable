import { ServerInstance } from "./server";
import { routers } from "./routers";
import { config } from "dotenv";
config();

const app = new ServerInstance();

async function main() {
   await app.connect();
   await app.connectToDB();

   for (const router of routers) {
      router();
   }
}

main().then();

export { app as serverInstance };
