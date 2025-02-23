import { Request, Response } from "express-serve-static-core";
import { promises as fs } from "fs";
import path from "path";
import { Apparel, ApparelSize } from "./apparel";

interface OrderItem {
  code: string;
  size: ApparelSize;
}

interface OrderRequest {
  order: OrderItem[];
}

interface OrderCostResponse {
  totalCost: number;
  items: Array<{
    code: string;
    size: ApparelSize;
    selectedVendor: {
      vendorId: string;
      price: number;
      quality: string;
    };
  }>;
}

export const checkAvailability = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    
    const { order } = req.body as OrderRequest;
    const filePath = path.resolve(__dirname, "../store.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const apparels = JSON.parse(fileData) as Apparel[];

    const isAvailable = order.every((item) => {
      const apparel = apparels.find(
        (a) => a.code === item.code && a.size === item.size
      );
      return apparel && apparel.stock.length > 0;
    });

    return res.json({ available: isAvailable });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to check order availability" });
  }
};

export const getLowestCost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { order } = req.body as OrderRequest;
    const filePath = path.resolve(__dirname, "../store.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const apparels = JSON.parse(fileData) as Apparel[];

    const orderDetails: OrderCostResponse = {
      totalCost: 0,
      items: [],
    };

    for (const item of order) {
      const apparel = apparels.find(
        (a) => a.code === item.code && a.size === item.size
      );

      if (!apparel || apparel.stock.length === 0) {
        return res.status(404).json({
          error: `Item not available: code ${item.code}, size ${item.size}`,
        });
      }

      const cheapestVendor = apparel.stock.reduce((prev, current) =>
        prev.price < current.price ? prev : current
      );

      orderDetails.items.push({
        code: item.code,
        size: item.size,
        selectedVendor: {
          vendorId: cheapestVendor.vendorId,
          price: cheapestVendor.price,
          quality: cheapestVendor.quality,
        },
      });

      orderDetails.totalCost += cheapestVendor.price;
    }

    return res.json(orderDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to calculate order cost" });
  }
};
