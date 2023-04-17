const router = require('express').Router()
const profileController = require('../controllers/profileController')

// Profile Route
router.post('/profile/:id', profileController.profile)

// User Info Route
router.post('/user-info/:id', profileController.userInfo)

// Book Appointment
router.post('/book-appointment', profileController.bookAppointment)

// Fetch Hospitals
router.get('/all-hospitals/:page', profileController.allHospital)


module.exports = router