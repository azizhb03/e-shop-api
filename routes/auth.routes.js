const express = require('express')

const router = express.Router()








router.post('/register' ,require('../controllers/auth.controller').register)





module.exports = router