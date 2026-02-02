import express from "express";
import { config } from "dotenv";

import { getAllTransactionsRoute } from "./modules/payments/adapters/routes/get-all-transactions.route.js";
import { newTransactionsRoute } from "./modules/payments/adapters/routes/new-transaction.route.js";

import { getUsersRoute } from "./modules/users/adapters/routes/get-users.route.js";
import { createUserRoute } from "./modules/users/adapters/routes/create-user.route.js";
import { deleteUserRoute } from "./modules/users/adapters/routes/delete-user.route.js";
import { updateUserRoute } from "./modules/users/adapters/routes/update-user.route.js";
import { loginUserRoute } from "./modules/users/adapters/routes/login-user.route.js";

config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/payments/", getAllTransactionsRoute, newTransactionsRoute);
app.use("/users/", getUsersRoute, createUserRoute, deleteUserRoute, updateUserRoute, loginUserRoute);

app.listen(port, () => console.log(`Server Running on Port ${port}`));
