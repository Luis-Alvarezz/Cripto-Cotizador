// * Similar a useReducer donde colocaremos STATE y Dispatch (Metodos a Utilizar)
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrencyInfer } from "./types/type";
import { getCriptos } from "./services/CryptoService";

type CryptoStoreType = {
  // cryptoCurrencies: CryptoCurrenciesInfer // * Lo mismo a la sig linea:
  cryptoCurrencies: CryptoCurrencyInfer[]
  fetchCryptos: () => Promise<void>
}

export const useCryptoStore = create<CryptoStoreType>()(devtools((set) => ({
  // * Colocar STATE y funciones que modifican al STATE (dispatch)
  cryptoCurrencies: [],
  fetchCryptos: async () => {
    // console.log('Desde FetchCrypto');
    // * Mandar a llamar el JSON y obtener las 20 monedas mas valiosas
    const cryptoCurrencies = await getCriptos() // * Obtenemos Promise {<pending>} | Necesitamos convertir esta accion en ASINCRONA 
    console.log(cryptoCurrencies);
    // ! Escribir en el STATE
    set(() => ({
      cryptoCurrencies: cryptoCurrencies
    }))
  }
})))