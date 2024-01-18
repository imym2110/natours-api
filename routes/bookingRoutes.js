const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/tourbooking/:tour/:user/:price')
  .get(bookingController.createBookingCheckout);

router
  .route('/checkout-session/:tourId')
  .get(bookingController.getCheckoutSession);

module.exports = router;
