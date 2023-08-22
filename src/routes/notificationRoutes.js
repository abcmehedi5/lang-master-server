const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// notificatin create oparation
router.post("/notification", async (req, res) => {
  try {
    const notificationData = req.body;
    await notificationController.createNotification(notificationData);
    res.status(200).send({
      message: "Notification Create Successfull",
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", error });
  }
});

// notification post oparetion

router.get("/notification", async (req, res) => {
  try {
    const notificationData = await notificationController.getNotification();
    res.status(200).send(notificationData);
  } catch (error) {
    res.status(500).send({ error: "NOtification Internal Server Error" });
  }
});

module.exports = router;
