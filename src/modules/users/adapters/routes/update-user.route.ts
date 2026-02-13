import { Request, Response, Router } from "express";
import { UpdateUserController } from "../controllers/update-user.controller.js";

export const updateUserRoute = Router();

updateUserRoute.put('/update-user/:id', async (request: Request<{ id: string }>, response: Response) => {
    const controller = UpdateUserController.build();
    return controller.handler(request, response);
});