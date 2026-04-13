import z from 'zod'
import { CryptoCurrencyResponseSchemaAPI, CurrencySchema } from '../schemas/crypto-schema'

// ! 2.- Infiriendo el TYPE mediente el ESQUEMA
export type Currency = z.infer<typeof CurrencySchema>

// ! 2.- Infiriendo el TYPe mediante ESQUEMA para respuesta de la API
// export type CryptoCurrenciesInfer = z.infer<typeof CryptoCurrenciesResponseSchemaAPI>
export type CryptoCurrencyInfer = z.infer<typeof CryptoCurrencyResponseSchemaAPI>
