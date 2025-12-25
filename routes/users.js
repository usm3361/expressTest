import { createUser } from "../constractor/users.js";
import { Router } from "express";

const router = Router();

// routs users
router.route("/users").post(createUser);

export default router;
