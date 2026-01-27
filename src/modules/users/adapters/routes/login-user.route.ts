import { Request, Response, Router } from "express";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql.repository.js";
import { CreateUserUseCase } from "../../app/use-cases/create-user.useCase.js";
import { CreateUserController } from "../controllers/create-user.controller.js";
import { LoginUserController } from "../controllers/login-user.controller.js";
import { LoginUserUseCase } from "../../app/use-cases/login-user.useCase.js";

export const loginUserRoute = Router();

const respository = new PrismaMySqlUserRepository();
const loginUserUsecase = new LoginUserUseCase(respository);
const loginUserController = new LoginUserController(loginUserUsecase)

loginUserRoute.post('/login', async (resquest: Request, response: Response) => {
    return loginUserController.handler(resquest, response)
})