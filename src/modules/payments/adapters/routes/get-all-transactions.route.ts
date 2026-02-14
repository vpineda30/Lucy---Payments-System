import { Request, Response, Router } from "express";
import { authMiddleware } from "../../../users/adapters/middlewares/auth.middleware.js";
import { GetAllTransactionsController } from "../controllers/get-all-transactions.controller.js";

export const getAllTransactionsRoute = Router();

getAllTransactionsRoute.get('/get-transactions', authMiddleware, async (request: Request, response: Response) => {
    const controller = GetAllTransactionsController.build();
    return controller.handler(request, response);
});
