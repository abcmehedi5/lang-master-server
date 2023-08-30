const express = require("express");
const router = express.Router();
const stripe = require("stripe")(`${process.env.PAYMENT_SECRET_KEY}`);
const paymentController = require("./../controllers/paymentController");

// generate payment secret
router.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  if (price) {
    const amount = parseFloat(price) * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  }
});

// save payment info to db
router.post("/payment-info", async (req, res) => {
  try {
    const paymentInfo = req.body.paymentInfo;
    const result = await paymentController.savePaymentInfo(paymentInfo);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "error on storing data" });
  }
});

module.exports = router;
