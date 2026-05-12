import express from "express";
import PopularService from "../model/popularServicesSchema.js";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const data = await PopularService.find();
  res.json(data);
});

// CREATE
router.post("/", async (req, res) => {
  const created = await PopularService.create(req.body);
  res.json(created);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await PopularService.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );

  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await PopularService.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
