const express = require("express");

let users = require("../db/users");

const nanoID = require("nanoid");

const idPattern = "1234567890abcdef";

let customID = nanoID.customAlphabet(idPattern, 10);

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  try {
    return res.send("Welcome to Tutorial-5");
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/users", (req, res) => {
  try {
    if (!users || !users.length) {
      return res
        .status(404)
        .json({ message: "Users not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Users retrieved", success: true, users: users });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user/:id", (req, res) => {
  try {
    let id = req.params.id;
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user: user });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add", (req, res) => {
  try {
    if (!req.body.email || !req.body.firstName) {
      return res
        .status(400)
        .json({ message: "Email or First name is missing", success: false });
    }
    if (users.find((user) => user.email === req.body.email)) {
      return res
        .status(409)
        .json({ message: "User already exist", success: false });
    }
    let user = {
      id: customID(),
      email: req.body.email,
      firstName: req.body.firstName,
    };
    users.push(user);
    return res.status(201).json({ message: "User added", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:id", (req, res) => {
  try {
    let id = req.params.id;
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const index = users.indexOf(user);
    users[index].email = req.body.email || users[index].email;
    users[index].firstName = req.body.firstName || users[index].firstName;
    return res.status(200).json({ message: "User updated", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
