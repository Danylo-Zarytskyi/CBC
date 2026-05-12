import Order from "../model/orderSchema.js";
import { validateOrder } from "../validation/validateOrder.js";

// CREATE
export const createOrder = async (req, res) => {
  try {
    const { isValid, errors } = validateOrder(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const files = req.files?.map((file) => file.path) || [];

    const order = await Order.create({
      name: req.body.name,
      phone: req.body.phone,
      service: req.body.service,
      comment: req.body.comment,
      files,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL
export const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

// UPDATE
export const updateOrder = async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

// DELETE  ✅ ОЦЕ ТЕБЕ ЛОМАЄ
export const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
