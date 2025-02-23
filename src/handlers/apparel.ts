import { promises as fs } from "fs";
import { Request, Response } from "express-serve-static-core";
import path from "path";

export enum ApparelSize {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

interface Stock {
  vendorId: string;
  quality: string;
  price: number;
}

export interface Apparel {
  code: string;
  size: ApparelSize;
  stock: Stock[];
}

interface ErrorResponse {
  error: string;
}

interface UpdateStockRequest {
  code: string;
  size: ApparelSize;
  vendor: string;
  price: number;
  quality: string;
}

interface BulkUpdateStockRequest {
  updates: UpdateStockRequest[];
}

export const getAllApparels = async (
  req: Request,
  res: Response
): Promise<Response<Apparel[] | ErrorResponse>> => {
  try {
    const filePath = path.resolve(__dirname, "../store.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const apparels = JSON.parse(fileData) as Apparel[];

    return res.json(apparels);
  } catch (error) {
    return res.status(500).json({ error: "Failed to read apparel data" });
  }
};

// Add the helper function
async function updateApparelStock(
  apparels: Apparel[],
  updateData: UpdateStockRequest
): Promise<{ apparel: Apparel | null; index: number }> {
  const apparelIndex = apparels.findIndex(
    (item) => item.code === updateData.code && item.size === updateData.size
  );

  if (apparelIndex === -1) {
    return { apparel: null, index: -1 };
  }

  apparels[apparelIndex].stock.push({
    vendorId: updateData.vendor,
    quality: updateData.quality,
    price: updateData.price,
  });

  return { apparel: apparels[apparelIndex], index: apparelIndex };
}

// Modify existing updateStock to use the helper
export const updateStock = async (
  req: Request,
  res: Response
): Promise<Response<Apparel | ErrorResponse>> => {
  try {
    const updateData = req.body as UpdateStockRequest;
    const filePath = path.resolve(__dirname, "../store.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const apparels = JSON.parse(fileData) as Apparel[];

    const { apparel } = await updateApparelStock(apparels, updateData);

    if (!apparel) {
      return res.status(404).json({ error: "Apparel not found" });
    }

    await fs.writeFile(filePath, JSON.stringify(apparels, null, 2));
    return res.json(apparel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update apparel stock" });
  }
};

// Add new bulkUpdateStock handler
export const bulkUpdateStock = async (
  req: Request,
  res: Response
): Promise<Response<Apparel[] | ErrorResponse>> => {
  try {
    const { updates } = req.body as BulkUpdateStockRequest;
    const filePath = path.resolve(__dirname, "../store.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const apparels = JSON.parse(fileData) as Apparel[];

    const updatedApparels: Apparel[] = [];

    for (const updateData of updates) {
      const { apparel } = await updateApparelStock(apparels, updateData);
      if (apparel) {
        updatedApparels.push(apparel);
      }
    }

    if (updatedApparels.length === 0) {
      return res
        .status(404)
        .json({ error: "No apparels were found to update" });
    }

    await fs.writeFile(filePath, JSON.stringify(apparels, null, 2));
    return res.json(updatedApparels);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to bulk update apparel stock" });
  }
};
