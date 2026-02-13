import { Request, Response, Router } from "express";
import { PrismaMySqlTransactionRepository } from "../../infra/repositories/prisma-mysql-transactions.repository.js";
import { GetAllTransactionsUseCase } from "../../app/use-cases/get-transactions.useCase.js";
import { GetAllTransactionsController } from "../controllers/get-all-transactions.controller.js";
import { authMiddleware } from "../../../users/adapters/middlewares/auth.middleware.js";

export const getAllTransactionsRoute = Router();

const prismaRepository = new PrismaMySqlTransactionRepository();
const getAllTransactionsUseCase = new GetAllTransactionsUseCase(prismaRepository);
const getAllTransactionsController = new GetAllTransactionsController(getAllTransactionsUseCase);

getAllTransactionsRoute.get('/get-transactions', authMiddleware, async (request: Request, response: Response) => {
    return getAllTransactionsController.handler(request, response);
});
