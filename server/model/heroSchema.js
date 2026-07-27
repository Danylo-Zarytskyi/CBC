import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      default:
        "Друк, поліграфія, дизайн, продаж канцелярії, рекламна продукція та доставка по Україні",
    },
    highlightedText: {
      type: String,
      default: "продаж канцелярії",
    },
    statYears: {
      type: String,
      default: "10+",
    },
    statYearsLabel: {
      type: String,
      default: "років досвіду",
    },
    statOrders: {
      type: String,
      default: "5000+",
    },
    statOrdersLabel: {
      type: String,
      default: "виконаних замовлень",
    },
    statSupport: {
      type: String,
      default: "24/7",
    },
    statSupportLabel: {
      type: String,
      default: "онлайн підтримка",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Hero", heroSchema);
