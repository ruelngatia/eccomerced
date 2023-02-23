const { Router } = require("express");
const router = Router();
const {login, signup} = require('../../controler/v1/controller')


router.post('/v1/auth/login',login)
router.post('/v1/auth/signup',signup)

module.exports = {router}