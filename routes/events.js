import { Router } from "express";
import { createEvent } from "../constractor/events.js";
import { readEvents } from "../utils/helperFunction.js";

const router = Router();

// routs events
router.route("/events").get(readEvents);
router.route("creator/events").post(createEvent);

export default router;
