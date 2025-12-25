import { Router } from "express";
import { createEvent } from "../constractor/events.js";

const router = Router();

// routs events
router.route("/events").post(createEvent);

export default router;
