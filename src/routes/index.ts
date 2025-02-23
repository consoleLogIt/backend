import express, { Router } from "express";
import apparelRoutes from "./apparel";
import orderRoutes from "./order";

const router: Router = express.Router();
router.use("/apparel", apparelRoutes);
router.use("/order", orderRoutes);

export default router;
