import express, { Router } from "express";
import {
  bulkUpdateStock,
  getAllApparels,
  updateStock,
} from "../handlers/apparel";

const router: Router = express.Router();

router.get("/", (req, res, next) => {
  getAllApparels(req, res).catch(next);
});

router.patch("/update", (req, res, next) => {
  updateStock(req, res).catch(next);
});

router.patch("/bulkUpdate", (req, res, next) => {
  bulkUpdateStock(req, res).catch(next);
});

export default router;
