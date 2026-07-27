import express from "express";
import Hero from "../model/heroSchema.js";

const router = express.Router();

// GET hero content (створює документ з дефолтними значеннями, якщо його ще немає)
router.get("/", async (req, res) => {
  try {
    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create({});
    }

    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE hero content (upsert - оновлює єдиний документ або створює його)
router.put("/", async (req, res) => {
  try {
    const hero = await Hero.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
