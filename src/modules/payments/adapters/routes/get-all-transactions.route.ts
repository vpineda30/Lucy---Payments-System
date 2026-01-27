import { Request, Response, Router } from "express";
import { PrismaTransactionRepository } from "../../infra/repositories/prisma-mysql.repository.js";
import { GetAllTransactionsUseCase } from "../../app/use-cases/get-transactions.useCase.js";
import { GetAllTransactionsController } from "../controllers/get-all-transactions.controller.js";

export const getAllTransactionsRoute = Router();

const prismaRepository = new PrismaTransactionRepository();
const getAllTransactionsUseCase = new GetAllTransactionsUseCase(prismaRepository);
const getAllTransactionsController = new GetAllTransactionsController(getAllTransactionsUseCase);

getAllTransactionsRoute.get('/get-transactions', async (request: Request, response: Response) => {
    return getAllTransactionsController.handler(request, response);
})
