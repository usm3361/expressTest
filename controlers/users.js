import { readUsers, validateUser, writeUsers } from "../utils/helperFunction.js";

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
    const { username, password, eventName, quantity } = req.body;
    const user = await validateUser(username, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid username or password" });
    } else {
      const events = await readEvents();
      const findEvent = events.find(
        (e) => e.eventName.toLowerCase() === eventName.toLowerCase()
      );
      if (!findEvent) {
        return res.status(404).json({ message: "event not found" });
      } else {
        const newReceipts = {
          username,
          eventName,
          ticketsBought: quantity,
        };
        if (
          !req.body.username ||
          !req.body.password ||
          !req.body.eventName ||
          !req.body.quantity
        ) {
          return res.status(400).json({
            message:
              "The body of buy must contain a username and password and eventName and quantity tickets For Sale",
          });
        } else {
          if (findEvent.ticketsForSale < quantity) {
            return res.status(400).json({
              message: "Not enough tickets left,",
              ticketsAvailable: findEvent.ticketsForSale,
            });
          } else {
            await writeUsers(newReceipts);
            res.status(201).json({ message: "added new receipts" });
            findEvent.ticketsForSale -= quantity;
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};
