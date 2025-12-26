import { buyTickets, createUser } from "../controlers/users.js";
import { Router } from "express";

const router = Router();

// routs users
router.route("/:username/summary").get()
router.route("/register").post(createUser);
router.route("/tickets/buy").post(buyTickets);

export default router;
