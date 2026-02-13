import { Request, Response, Router } from "express";
import { PrismaMySqlTransactionRepository } from "../../infra/repositories/prisma-mysql-transactions.repository.js";
import { NewTransactionUseCase } from "../../app/use-cases/new-transaction.useCase.js";
import { NewTransactionsController } from "../controllers/new-transaction.controller.js";
import { PrismaMySqlUserProvider } from "../../../users/infra/providers/prisma-mysql-user.provider.js";
import { authMiddleware } from "../../../users/adapters/middlewares/auth.middleware.js";

export const newTransactionsRoute = Router();

const prismaUserRepository = new PrismaMySqlTransactionRepository();
const prismaUserTransactionsRepository = new PrismaMySqlUserProvider()
const TransactionsUseCase = new NewTransactionUseCase(prismaUserRepository, prismaUserTransactionsRepository);
const transactionsController = new NewTransactionsController(TransactionsUseCase);

newTransactionsRoute.post("/new-transaction", authMiddleware, async (request: Request, response: Response) => {
    return transactionsController.handler(request, response);
});
