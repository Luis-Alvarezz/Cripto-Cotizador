import z from 'zod'
import { CryptoCurrencyResponseSchemaAPI, CurrencySchema, PairSchema } from '../schemas/crypto-schema'

// ! 2.- Infiriendo el TYPE mediente el ESQUEMA
export type Currency = z.infer<typeof CurrencySchema>

// ! 2.1- Infiriendo el TYPe mediante ESQUEMA para respuesta de la API
// export type CryptoCurrenciesInfer = z.infer<typeof CryptoCurrenciesResponseSchemaAPI>
export type CryptoCurrencyInfer = z.infer<typeof CryptoCurrencyResponseSchemaAPI>

// ! 2.2- Infiriendo el TYPE mediante ESQUEMA para el STATE de 'pair'
export type PairInfer = z.infer<typeof PairSchema> 