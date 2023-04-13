const router = require('express').Router()
const authController = require('../controllers/authController')
const verifyUserMiddleware = require('../middleware/verifyUserMiddleware')

// Register Route
router.post('/register', authController.register)

// Login Route
router.post('/login', authController.login)

// Verify User Route
router.post('/verify-user', verifyUserMiddleware, authController.verifyUser)

module.exports = router