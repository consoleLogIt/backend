import express, { Router } from "express";
import { checkAvailability, getLowestCost } from "../handlers/order";
const router: Router = express.Router();

router.post("/checkAvailability", (req, res, next) => {
  checkAvailability(req, res).catch(next);
});

router.post("/getLowestCost", (req, res, next) => {
  getLowestCost(req, res).catch(next);
});

export default router;
