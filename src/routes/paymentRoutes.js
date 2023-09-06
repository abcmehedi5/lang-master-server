const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const stripe = require("stripe")(`${process.env.PAYMENT_SECRET_KEY}`);
const paymentController = require("./../controllers/paymentController");
const { ObjectId } = require('mongodb');

// nodemailer function
const sendMail = (emailData, emailAddress) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: emailAddress,
    subject: emailData.subject,
    html: `<p>${emailData.desc}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};

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
    // send confirmation email to user
    sendMail(
      {
        subject: "Payment Successful",
        desc: `Payment Id: ${result?.insertedId}, Transaction Id: ${paymentInfo.transactionId}`,
      },
      paymentInfo?.email
    );
    // send confirmation email to host
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "error on storing data" });
  }
});


// Get all payments data---------------------
router.get("/payment", async (req, res) => {
  try {
    const paymentData = await paymentController.getPayment();
    res.status(200).send(paymentData);
  } catch (error) {
    res.status(500).send({ error: "Internal server error", details: error });
  }
});


// Get single payment data by email-------------------
router.get("/paymentUser", async (req, res) => {
  try {
    const { email } = req.query; 
    const query = { email }; 
   
    const paymentData = await paymentController.getPaymentEmail(query);
    res.status(200).send(paymentData);
  } catch (error) {
    res.status(500).send({ error: "Internal server error", details: error });
  }
});


// delete notification
router.delete("/payment/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const paymentDelete = await paymentController.deletePayment(query);
    res
      .status(200)
      .send({ message: "payment deleted", data: paymentDelete });
  } catch (error) {
    res.status(500).send({ error: "Payment Internal Server Error" });
  }
});




// get all blogs data
router.get("/payment", async (req, res) => {
  try {
    const blogData = await blogController.getBlog();
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
});

module.exports = router;
