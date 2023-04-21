const router = require('express').Router()
const authController = require('../controllers/authController')

// Register Route
router.post('/register', authController.register)

// Login Route
router.post('/login', authController.login)

// Verify User Route
router.get('/verify-user', authController.verifyUser)

// Logout
router.get('/logout', authController.logout)

module.exports = router