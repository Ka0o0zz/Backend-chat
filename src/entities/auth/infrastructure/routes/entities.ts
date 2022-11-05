import { Router } from "express";
import { AuthUseCase } from "../../application/authUseCase";
import { AuthController } from "../controllers/auth.controllers";
import { MongoAuthRepository } from "../repository/mongo.auth.repository";

const router = Router();

const mongoAuthRepository = new MongoAuthRepository();
const authUseCase = new AuthUseCase(mongoAuthRepository);
const authCtrl = new AuthController(authUseCase);

router.post("/", authCtrl.registerCtrl);
router.post("/login", authCtrl.loginCtrl);
router.post("/verify", authCtrl.verifyOTPCtrl);

router.get("/:uuid", authCtrl.generateOTPCtrl);

export default router;
