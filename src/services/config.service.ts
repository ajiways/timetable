class ConfigService {
   get dbUser(): string {
      const dbUser = process.env.PGUSER;
      if (!dbUser) {
         throw new Error("Нет имени пользователя");
      }
      return dbUser;
   }

   get dbHost(): string {
      const dbHost = process.env.PGHOST;
      if (!dbHost) {
         throw new Error("Нет адреса хоста");
      }
      return dbHost;
   }

   get dbPassword(): string {
      const dbPassword = process.env.PGPASSWORD;
      if (!dbPassword) {
         throw new Error("Нет пароля пользователя");
      }
      return dbPassword;
   }

   get dbName(): string {
      const dbName = process.env.PGDATABASE;
      if (!dbName) {
         throw new Error("Нет имени конкретной базы данных");
      }
      return dbName;
   }

   get dbPort(): number {
      const dbPort = process.env.PGPORT;
      if (!dbPort) {
         throw new Error("Нет порта для хоста");
      } else if (!Number(dbPort)) {
         throw new Error("Некорректный порт");
      }
      return Number(dbPort);
   }

   get port(): number {
      const port = process.env.PORT;
      if (!port) {
         throw new Error("Нет порта для сервера");
      } else if (!Number(port)) {
         throw new Error("Некорректный порт");
      }
      return Number(port);
   }

   get secret(): string {
      const secret = process.env.SECRET;
      if (!secret) {
         throw new Error("Нет секретного ключа");
      }
      return secret;
   }
}
export const configService = new ConfigService();
