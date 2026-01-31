import { Request, Response, Router } from "express";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql-user.repository.js";
import { UpdateUserUseCase } from "../../app/use-cases/update-user.useCase.js";
import { UpdateUserController } from "../controllers/update-user.controller.js";

export const updateUserRoute = Router();

const repository = new PrismaMySqlUserRepository();
const updateUserUseCase = new UpdateUserUseCase(repository);
const updateUserController = new UpdateUserController(updateUserUseCase);

updateUserRoute.put('/update-user/:id', async (request: Request<{ id: string }>, response: Response) => {
    return updateUserController.handler(request, response)
})