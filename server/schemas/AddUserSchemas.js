import {z} from "zod";

export const addUserSchema = z.object({
  name: z.string().regex(/^.+$/, { message: "El nombre debe tener al menos 1 carácter"}),
  email: z.email({ message: "Email no valido" }),
  userType: z.string().regex(/^[12]$/, { message: 'Debe ser "1" o "2"' })
});