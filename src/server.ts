import express, { Application } from "express";
import cors from "cors";

import { dbConnection } from "./db/mongo";

import authRoute from "./entities/auth/infrastructure/routes/entities";
import userRoute from "./entities/user/infrastructure/routes/user.routes";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    auth: "/api/auth",
    user: "/api/user",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    this.dbConnection();
    this.middleware();
    this.routes();
  }

  async dbConnection() {
    try {
      await dbConnection();
    } catch (err: any) {
      console.log(err);
    }
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoute);
    this.app.use(this.apiPaths.user, userRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
