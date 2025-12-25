import { createUser } from "../constractor/users.js";
import { Router } from "express";
import { readUsers } from "../utils/helperFunction.js";

const router = Router();

// routs users
router.route("/users").get(readUsers);
router.route("/users/register").post(createUser)
router.route("/users/tickets/buy").post(createUser);
router.route("/users/:username/summary");



export default router;
