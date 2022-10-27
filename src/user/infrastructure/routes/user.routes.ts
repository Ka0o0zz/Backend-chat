import { Router } from "express";
import { checkJwt } from "../../../middlewares/session";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controllers/user.controllers";
import { MongoUserRepository } from "../repository/mongo.user.repository";

const router = Router();

const mongoUserRepository = new MongoUserRepository();
const userUseCase = new UserUseCase(mongoUserRepository);
const userCtrl = new UserController(userUseCase);

router.get("/:uuid", checkJwt, userCtrl.findUserByIdCtrl);

export default router;
