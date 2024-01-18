const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Booking = require('../models/bookingModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //1) Get currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  //2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    //${req.protocol}://${req.get('host')}/
    success_url: `http://localhost:3001/ps/${req.params.tourId}/5c8a23c82f8fb814b56fa18d/${tour.price}`,
    cancel_url: `http://localhost:3001/pf`,
    customer_email: 'laura@example.com',
    client_reference_id: req.params.tourId,

    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/tour-1-cover.jpg`],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  //3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const { tour, price, user } = req.params;
  console.log(tour);
  console.log(price);
  console.log(user);

  if (!tour && !price && !user) {
    return next(new AppError('Please give all details propewrly', 400));
  }
  await Booking.create({ tour, user, price });

  res.status(200).json({
    status: 'success',
    message: 'Your payment was successfull, check your bank balancen to verify',
  });
});
