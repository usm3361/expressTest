import {
  readEvents,
  validateUser,
  writeEvents,
} from "../utils/helperFunction.js";

export const createEvent = async (req, res) => {
  try {
    const { eventName, ticketsForSale, username, password } = req.body;

    const user = await validateUser(username, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid username or password" });
    } else {
      const events = await readEvents();
      if (events.some((e) => e.eventName.toLowerCase() === eventName.toLowerCase())) {
        return res.status(400).json({ message: "eventName already exists" });
      }
      const newEvent = {
        eventName,
        ticketsForSale,
        username,
      };
      if (
        !req.body.eventName ||
        !req.body.ticketsForSale ||
        !req.body.username ||
        !req.body.password
      ) {
        return res.status(400).json({
          message:
            "The body of event must contain a username and password and eventName and tickets For Sale",
        });
      } else {
        events.push(newEvent);
        await writeEvents(events);
        res.status(201).json({ message: "Event created successfully" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};
