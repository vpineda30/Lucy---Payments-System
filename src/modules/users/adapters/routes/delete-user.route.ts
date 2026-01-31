import { Request, Response, Router } from "express";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql-user.repository.js";
import { DeleteUserUseCase } from "../../app/use-cases/delete-user.useCase.js";
import { DeleteUserController } from "../controllers/delete-user.controller.js";

export const deleteUserRoute = Router();

const respository = new PrismaMySqlUserRepository();
const deleteUserUseCase = new DeleteUserUseCase(respository)
const deleteUserController = new DeleteUserController(deleteUserUseCase)

deleteUserRoute.delete('/delete-user/:id', async (request: Request<{ id: string }>, response: Response) => {
    deleteUserController.handler(request, response)
})