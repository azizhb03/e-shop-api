const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", require("./routes/auth.routes"));

app.listen(5000, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => console.log("database host : ", res.connection.host))
    .catch((err) => console.log("error : ", err));
  console.log("listening on port 5000");
});
