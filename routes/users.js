import { buyTickets, createUser } from "../controlers/users.js";
import { Router } from "express";

const router = Router();

// routs users
router.route("/users/register").post(createUser);
router.route("/users/tickets/buy").post(createUser);
router.route("/users/:username/summary").post(buyTickets);

export default router;
