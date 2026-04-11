import { z } from 'zod'

// ! 1.- Creando el Esquema
export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string()
})