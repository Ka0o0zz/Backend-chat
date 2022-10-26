import { Router } from "express";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controller/user.controller";
import { MongoUserRepository } from "../repository/mongo.user.repository";

const router = Router()

const mongoUserRepository = new MongoUserRepository()

const userUseCase = new UserUseCase(mongoUserRepository)

const userCtrl = new UserController(userUseCase)

router.post('/user', userCtrl.insertCtrl)

export default router;