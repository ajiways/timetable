import { ServerInstance } from "./server";
import { initRoles } from "./misc/init.roles";
import { routers } from "./routers";
import { config } from "dotenv";
config();

const app = new ServerInstance();

async function main() {
   await app.connect();
   await app.connectToDB();
   await initRoles();

   for (const router of routers) {
      router();
   }
}

main().then();

export { app as serverInstance };
