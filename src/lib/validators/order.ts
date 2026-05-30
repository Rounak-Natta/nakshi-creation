import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().min(2),

  phone: z.string().min(10),

  addressLine1: z.string(),

  city: z.string(),

  state: z.string(),

  postalCode: z.string(),

  country: z.string(),
});