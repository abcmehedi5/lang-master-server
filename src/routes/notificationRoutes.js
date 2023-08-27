const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { ObjectId } = require("mongodb");

// notificatin create oparation
router.post("/notification", async (req, res) => {
  try {
    const notificationData = req.body;
    console.log(notificationData);
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
  const email = req.query.email;
  const query = { email: email };
  try {
    const notificationData = await notificationController.getNotification(
      query
    );
    res.status(200).send(notificationData);
  } catch (error) {
    res.status(500).send({ error: "NOtification Internal Server Error" });
  }
});

// delete notification

router.delete("/notification/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const notificationDelete = await notificationController.deleteNotification(
      query
    );
    res
      .status(200)
      .send({ message: "notification deleted", data: notificationDelete });
  } catch (error) {
    res.status(500).send({ error: "Notification Internal Server Error" });
  }
});

module.exports = router;
