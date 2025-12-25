import { buyTickets, createUser } from "../controlers/users.js";
import { Router } from "express";

const router = Router();

// routs users
router.route("/users/register").post(createUser);
router.route("/users/tickets/buy").post(buyTickets);

export default router;
