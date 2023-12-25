const bcrypt = require("bcrypt");
const User = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "not found" });
    } else {

      const match = bcrypt.compareSync(password, user.password);

      if (!match)
        res.status(400).json({ message: "please check your password !" });
      else {
        const privateKey = fs.readFileSync("./private-key.pem", "utf8");

        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: {
              _id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
            },
          },
          privateKey,
          { algorithm: "RS256" }
        );

        const exp = Date.now() + 1000 * 60 * 60 * 7;

        return res.cookie("Authorization", token).status(200)
          .send({
            message: "login with success",
            data: { email: user.email, id: user._id },
          })
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};
const logout = (req, res) => {

  res.clearCookie('Authorization');
  res.send('cookie foo cleared');


};
module.exports = {
  register,
  login,
  logout,
};
