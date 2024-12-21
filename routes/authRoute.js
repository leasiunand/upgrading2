const express = require('express')
const {register} = require('../controllers/authController')

const authRouter = express.Router()

authRouter.post('/auth/register', register)

module.exports = authRouter