const router = require('express').Router()
const profileController = require('../controllers/profileController')

// Profile Route
router.post('/profile/:id', profileController.profile)

module.exports = router