import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2),

  slug: z.string().min(2),

  description: z.string().min(10),

  sku: z.string().min(2),

  price: z.number(),

  comparePrice: z.number().optional(),

  stock: z.number(),

  categoryId: z.string(),
});