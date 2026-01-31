import { Router, Request, Response } from "express";
import { PrismaMySqlUserTransactionsRepository } from "../../infra/repositories/prisma-mysql-user-transactions.repository.js";
import { GetUserBalanceUseCase } from "../../app/use-cases/get-user-balance.useCase.js";
import { GetUserBalanceController } from "../controllers/get-user-balance.controller.js";

export const getUserBalanceRoute = Router();

const respository = new PrismaMySqlUserTransactionsRepository();
const getUserBalanceUseCase = new GetUserBalanceUseCase(respository)
const getUserBalanceController = new GetUserBalanceController(getUserBalanceUseCase)

getUserBalanceRoute.get('/get-user-balance/:id', async (request: Request<{ id: string }>, response: Response) => {
    return getUserBalanceController.handler(request, response)
})