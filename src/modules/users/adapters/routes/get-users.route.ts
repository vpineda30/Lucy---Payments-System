import { Request, Response, Router } from "express";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql-user.repository.js";
import { GetUsersUseCase } from "../../app/use-cases/get-users.useCase.js";
import { GetUsersController } from "../controllers/get-users.controller.js";

export const getUsersRoute = Router();

const repository = new PrismaMySqlUserRepository();
const getUsersUseCase = new GetUsersUseCase(repository);
const getUsersController = new GetUsersController(getUsersUseCase);

getUsersRoute.get('/get-users', async (request: Request, response: Response) => {
    return getUsersController.handler(request, response)
})