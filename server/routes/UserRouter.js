const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/users', UserController.getUsers)
router.post('/users/signup', UserController.signUp)
router.post('/users/login', UserController.logIn)

module.exports = router;