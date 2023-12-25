const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const fs = require("fs");

router.post("/register", require("../controllers/auth.controller").register);
router.post("/login", require("../controllers/auth.controller").login);
router.get("/logout", require("../controllers/auth.controller").logout);
router.get("/check", (req, res) => {
    const privateKey = fs.readFileSync("./private-key.pem", "utf8");
    jwt.verify(req.query.token, privateKey, function (err, decoded) {
        if (decoded) {
            res.status(200).json({ message: "isAuth" });
        }
        else if (err) {
            res.status(401).json({ message: "session expired" });

        }   
    });

}
)

module.exports = router;
