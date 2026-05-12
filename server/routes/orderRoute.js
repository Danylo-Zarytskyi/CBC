import express from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../controller/orderCtrl.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// public
router.post("/", upload.array("files"), createOrder);

// admin
router.get("/", authMiddleware, getOrders);
router.patch("/:id", authMiddleware, updateOrder);
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
