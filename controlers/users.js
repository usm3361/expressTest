import {
  readEvents,
  readReceipts,
  readUsers,
  validateUser,
  writeEvents,
  writeReceipts,
  writeUsers,
} from "../utils/helperFunction.js";

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
    res.status(500).json({ msg: err + err.message, data: null });
  }
};

export const buyTickets = async (req, res) => {
  try {
    const { username, password, eventName, quantity } = req.body;
    if (!username || !password || !eventName || !quantity) {
      return res.status(400).json({
        message:
          "Body must contain: username, password, eventName, and quantity",
      });
    }
    const user = await validateUser(username, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid username or password" });
    } else {
      const events = await readEvents();
      const receipts = await readReceipts();
      const findEvent = events.find(
        (e) => e.eventName.toLowerCase() === eventName.toLowerCase()
      );
      if (!findEvent) {
        return res.status(404).json({ message: "event not found" });
      } else {
        if (findEvent.ticketsForSale < quantity) {
          return res.status(400).json({
            message: "Not enough tickets left,",
            ticketsAvailable: findEvent.ticketsForSale,
          });
        } else {
          findEvent.ticketsForSale -= quantity;
          const newReceipts = {
            username,
            eventName,
            ticketsBought: quantity,
          };
          receipts.push(newReceipts);
          await Promise.all([writeEvents(events), writeReceipts(receipts)]);
          res
            .status(201)
            .json({
              message: "Purchase completed successfully",
              receipt: newReceipts,
            });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err + err.message, data: null });
  }
};

export const summaryAllTicketsByUser = async (req, res) => {
  try {
    const {username} = req.params
    const receipts = await readReceipts()
    const findReceipt = receipts.find(receipt=>receipt.username.toLowerCase()===username)
console.log(findReceipt)
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err + err.message, data: null });
  }
};
