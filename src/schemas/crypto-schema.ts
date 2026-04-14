import { z } from 'zod'

// ! 1.- Creando el Esquema
export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string()
})

// ! 1.1- Metodo para Crear ESQUEMA de la Cripto con el Codigo d 3 digitos y el nombre
export const CryptoCurrencyResponseSchemaAPI = z.object({
  NAME: z.string(),
  SYMBOL: z.string()
})

export const CryptoCurrenciesResponseSchemaAPI = z.array(CryptoCurrencyResponseSchemaAPI) // * Similar a Product[]

// ! 1.2- Metodo crear ESQUEMA en el STATE de pair (CriptoSearchForm):
export const PairSchema = z.object({
  currency: z.string(),
  cryptocurrency: z.string()
})