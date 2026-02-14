import { Request, Response, Router } from "express";
import { authMiddleware } from "../../../users/adapters/middlewares/auth.middleware.js";
import { NewTransactionsController } from "../controllers/new-transaction.controller.js";

export const newTransactionsRoute = Router();

newTransactionsRoute.post("/new-transaction", authMiddleware, async (request: Request, response: Response) => {
    const controller = NewTransactionsController.build()
    return controller.handler(request, response);
});
