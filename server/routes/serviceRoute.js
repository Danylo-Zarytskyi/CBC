import express from "express";
import Service from "../model/serviceSchema.js";
import mongoose from "mongoose";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const created = await Service.create(req.body);
    res.json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
