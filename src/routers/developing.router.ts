import { DevelopingController } from "../controllers/developing.controller";
import { EMethod } from "../interfaces/server.interface";
import { serverInstance } from "../main";
import { authMiddleware } from "../middleware/authorization.middleware";
import { DevelopingService } from "../services/developing.service";

export function devRouter(): void {
   const provider = serverInstance.getDBConnection();
   const developingService = new DevelopingService(provider);
   const developingController = new DevelopingController(developingService);

   serverInstance.addHandler(
      EMethod.GET,
      "/dev/userdata",
      developingController.getUserInfo.bind(developingController),
      [authMiddleware]
   );
}
