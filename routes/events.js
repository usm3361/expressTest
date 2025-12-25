import { Router } from "express";
import { createEvent } from "../controlers/events.js";

const router = Router();

// routs events
router.route("/events").post(createEvent);

export default router;
