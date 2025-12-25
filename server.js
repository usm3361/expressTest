import express from "express";
import users from "./routes/users.js"
import events from "./routes/events.js"



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Simple Auth API" });
});

app.use("/users", users)
app.use("/creator", events)


app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

