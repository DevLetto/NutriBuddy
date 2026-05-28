import express from "express";
import FoodFactsService from "../Service/FoodFactsService.js";

const router = express.Router();

router.get("/:barcode", async (req, res) => {
  try {
    const { barcode } = req.params;
    const result = await FoodFactsService(barcode);
    res.json(result);
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
});

export default router;
