import {z} from "zod";

export const addUserSchema = z.object({
  email: z.email({ message: "Email no valido" }),
});