import { Request, Response, Router } from "express";
import { GetUsersController } from "../controllers/get-users.controller.js";

export const getUsersRoute = Router();
const controller = GetUsersController.build();

getUsersRoute.get('/get-users', async (request: Request, response: Response) => {
    return controller.handler(request, response)
})