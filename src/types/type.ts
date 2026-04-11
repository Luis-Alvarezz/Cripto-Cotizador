import z from 'zod'
import { CurrencySchema } from '../schemas/crypto-schema'

// ! 2.- Infiriendo el TYPE mediente el ESQUEMA
export type Currency = z.infer<typeof CurrencySchema>