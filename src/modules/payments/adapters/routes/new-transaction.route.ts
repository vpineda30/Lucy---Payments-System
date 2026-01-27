import { Request, Response, Router } from "express";
import { PrismaTransactionRepository } from "../../infra/repositories/prisma-mysql.repository.js";
import { NewTransactionUseCase } from "../../app/use-cases/new-transaction.useCase.js";
import { NewTransactionsController } from "../controllers/new-transaction.controller.js";

export const newTransactionsRoute = Router();

const prismaRepository = new PrismaTransactionRepository();
const TransactionsUseCase = new NewTransactionUseCase(prismaRepository);
const transactionsController = new NewTransactionsController(
    TransactionsUseCase,
);

newTransactionsRoute.post("/new-transaction", async (request: Request, response: Response) => {
    return transactionsController.handler(request, response);
})
