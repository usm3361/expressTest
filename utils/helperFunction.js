import fs from "fs/promises";

const USERS_PATH = "./data/users.json";
const EVENTS_PATH = "./data/events.json";

// user function
export const readUsers = async () => {
  try {
    const USERS = await fs.readFile(USERS_PATH, "utf-8");
    const USERSOBJ = JSON.parse(USERS);
    return USERSOBJ;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const writeUsers = async (users) => {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
};

// events function
export async function validateUser(username, password) {
  const users = await readUsers();
  const user = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
  return user || null;
}
export const readEvents = async () => {
  try {
    const EVENTS = await fs.readFile(EVENTS_PATH, "utf-8");
    const EVENTSOBJ = JSON.parse(EVENTS);
    return EVENTSOBJ;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const writeEvents = async (events) => {
  await fs.writeFile(EVENTS_PATH, JSON.stringify(events, null, 2));
};

// export const validateUser = async (username, password) => {
//   const users = await readUsers();
//   const user = users.find((u) => u.username.toUpperCase() === username.toUpperCase());
//   if (user) {
//     const isValid = user.password === password;
//     if (user && isValid) {
//       return user;
//     } else {
//       return null;
//     }
//   } else {
//     console.log("user not found");
//     return null;
//   }
// };

// server function
export const healthServer = async (req, res) => {
  try {
    res.status(200).json({
      msg: "server running",
      status: "ok",
      serverTime: "ISO_TIMESTAMP",
    });
  } catch (err) {
    console.log(err);
  }
};
