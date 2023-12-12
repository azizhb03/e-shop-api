const bcrypt = require("bcrypt");
const User = require("../models/auth.model");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: " user already registered" });
    } else {
      const hashed = bcrypt.hashSync(password, 10);

      const newUser = await User.create({ username, email, password: hashed });

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser.username });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  register,
};
