// * Similar a useReducer donde colocaremos STATE y Dispatch (Metodos a Utilizar)
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { APIResponseInfer, CryptoCurrencyInfer, PairInfer } from "./types/type";
import { fetchCurrentCryptoPrice, getCriptos } from "./services/CryptoService";

type CryptoStoreType = {
  // cryptoCurrencies: CryptoCurrenciesInfer // * Lo mismo a la sig linea:
  cryptoCurrencies: CryptoCurrencyInfer[]
  APIResponse: APIResponseInfer
  fetchCryptos: () => Promise<void>
  fetchData: (pair: PairInfer) => Promise<void>
}

export const useCryptoStore = create<CryptoStoreType>()(devtools((set) => ({
  // * Colocar STATE y funciones que modifican al STATE (dispatch)
  cryptoCurrencies: [],
  APIResponse: {} as APIResponseInfer, // * Este OBJETO Tratalo como APIResponseInfer
  fetchCryptos: async () => {
    // console.log('Desde FetchCrypto');
    // * Mandar a llamar el JSON y obtener las 20 monedas mas valiosas
    const cryptoCurrencies = await getCriptos() // * Obtenemos Promise {<pending>} | Necesitamos convertir esta accion en ASINCRONA 
    // console.log(cryptoCurrencies);
    // ! Escribir en el STATE
    set(() => ({
      cryptoCurrencies: cryptoCurrencies
    }))
  },

  fetchData: async (pair) => {
    // console.log('Desde FetchData, recibiendo Pair: ',pair);
    const APIResponse = await fetchCurrentCryptoPrice(pair)
    // console.log(APIResponse); // * OUTPUT: Misma respuesta del Service en base al ESQUEMA de la API Response
    set(() => ({
      APIResponse: APIResponse
    }))
  }
})))