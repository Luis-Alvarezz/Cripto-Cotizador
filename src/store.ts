// * Similar a useReducer donde colocaremos STATE y Dispatch (Metodos a Utilizar)
import { create } from "zustand";
import axios from "axios";
import type { CryptoCurrencyInfer } from "./types/type";
import { CryptoCurrenciesResponseSchemaAPI } from "./schemas/crypto-schema";

type CryptoStoreType = {
  // cryptoCurrencies: CryptoCurrenciesInfer // * Lo mismo a la sig linea:
  cryptoCurrencies: CryptoCurrencyInfer[]
  fetchCryptos: () => Promise<void>
}

async function getCriptos() {
  const url = 'https://data-api.coindesk.com/asset/v1/top/list?page=1&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD&page_size=20'
  // const data = await axios(url)
  // console.log(data);
  // console.log(data.data);
  // console.log(data.data.Data.LIST); // * EQUIVALENTE A:
  const {data : { Data: {LIST} } } = await axios(url)
  // console.log(LIST);
  const result = CryptoCurrenciesResponseSchemaAPI.safeParse(LIST) // * Revisamos la respuesta de la API porque TS ya no puede mediante el ESQUEMA
  console.log(result);
  if (result.success === true) {
    return result.data
  }
}

export const useCryptoStore = create<CryptoStoreType>((set) => ({
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
}))