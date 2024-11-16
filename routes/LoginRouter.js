const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const loginController = require('../controllers/LoginCtrl.js')

router
.get("/", loginController.login)

module.exports = router;