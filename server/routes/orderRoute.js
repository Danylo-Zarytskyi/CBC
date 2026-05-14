import express from "express";
import Order from "../model/orderSchema.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

//
// GET ALL
//
router.get("/", async (_, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// CREATE
//
// orderRoutes.js
router.post("/", upload.array("files", 10), async (req, res) => {
  // Максимум 10 файлів
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // Підготовка інформації про файли
    const fileData =
      req.files?.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
      })) || [];

    const order = await Order.create({
      name: req.body.name,
      phone: req.body.phone,
      service: req.body.service,
      comment: req.body.comment,
      files: fileData, // Зберігаємо детальну інформацію
      status: "pending",
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({
      error: err.message,
      details: err.errors,
    });
  }
});

//
// UPDATE STATUS
//
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// DELETE
//
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
