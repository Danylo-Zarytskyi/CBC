import express from "express";
import Work from "../model/worksSchema.js";
import mongoose from "mongoose";

const router = express.Router();

/* GET all works */
router.get("/", async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* CREATE work */
router.post("/", async (req, res) => {
  try {
    const newWork = await Work.create(req.body);
    res.json(newWork);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE work */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE work */
router.delete("/:id", async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
