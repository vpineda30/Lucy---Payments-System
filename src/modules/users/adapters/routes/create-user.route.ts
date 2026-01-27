import { Request, Response, Router } from "express";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql.repository.js";
import { CreateUserUseCase } from "../../app/use-cases/create-user.useCase.js";
import { CreateUserController } from "../controllers/create-user.controller.js";

export const createUserRoute = Router();

const respository = new PrismaMySqlUserRepository();
const createUserUsecase = new CreateUserUseCase(respository);
const createUserController = new CreateUserController(createUserUsecase)

createUserRoute.post('/create-user', async (resquest: Request, response: Response) => {
    return createUserController.handler(resquest, response)
})