import { Router } from "express";
import express from "express";
import users from "./routes/users.js"
import events from "./routes/events.js"
import { healthServer } from "./utils/helperFunction.js";



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const router = Router();

// route health
router.route("/").get(healthServer)

app.use("/", users)
app.use("/creator", events)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

