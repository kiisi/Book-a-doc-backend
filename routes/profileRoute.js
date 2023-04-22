const router = require('express').Router()
const profileController = require('../controllers/profileController')

// Profile Route
router.post('/profile/:id', profileController.profile)

// User Info Route
router.post('/user-info/:id', profileController.userInfo)

// Book Appointment
router.post('/book-appointment', profileController.bookAppointment)

// Get one Hospital
router.get('/hospital/:id', profileController.oneHospital)

// Fetch Hospitals
router.get('/all-hospitals/:page', profileController.allHospital)

// Fetch Hospitals
router.get('/user-appointments', profileController.userAppointments)

module.exports = router