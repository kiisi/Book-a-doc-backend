const router = require('express').Router()
const profileController = require('../controllers/profileController')

// Profile Route
router.post('/profile', profileController.profile)

module.exports = router