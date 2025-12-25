import { readUsers, writeUsers } from "../utils/helperFunction.js";

export const createUser = async (req, res) => {
  try {
    const users = await readUsers();
    const { username, password } = req.body;

    if (
      users.some((u) => u.username.toLowerCase() === username.toLowerCase())
    ) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = {
      username,
      password,
    };
    if (!newUser.username || !newUser.password) {
      return res
        .status(400)
        .json({ message: "The user must contain a username and password" });
    } else {
      users.push(newUser);
      await writeUsers(users);
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};

export const buyTickets = async (req, res) => {
  try {
    const { username, password, eventName, quantity } = req.budy;
    const user = await validateUser(username, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid username or password" });
    } else {
      const events = await readEvents();
      const findEvents = events.find(
        (e) => e.eventName.toLowerCase() === eventName.toLowerCase()
      );
      if (!findEvents) {
          return res.status(404).json({ message: "event not found" });
      } else {
          
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};
