const router = require('express').Router()
const profileController = require('../controllers/profileController')

// Profile Route
router.post('/profile/:id', profileController.profile)

// User Info Route
router.post('/user-info/:id', profileController.userInfo)

module.exports = router