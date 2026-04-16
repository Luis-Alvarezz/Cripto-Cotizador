import axios from "axios";
import { ApiResponseSchema, CryptoCurrenciesResponseSchemaAPI } from "../schemas/crypto-schema";
import type { PairInfer } from "../types/type";

export async function getCriptos() {
  const url = 'https://data-api.coindesk.com/asset/v1/top/list?page=1&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD&page_size=20'
  // const data = await axios(url)
  // console.log(data);
  // console.log(data.data);
  // console.log(data.data.Data.LIST); // * EQUIVALENTE A:
  const {data : { Data: {LIST} } } = await axios(url)
  // console.log(LIST);
  const result = CryptoCurrenciesResponseSchemaAPI.safeParse(LIST) // * Revisamos la respuesta de la API porque TS ya no puede mediante el ESQUEMA
  // console.log(result);
  if (result.success === true) {
    return result.data
  }
}

// * Endpoint para extraer datos de la busqueda del Formulario para Cryto en Moneda local
export async function fetchCurrentCryptoPrice(pair: PairInfer) {
  // console.log('Desde Endpoint de fetchCurrentCryptoPrice de Service, Pair: ', pair);
  const url = `https://data-api.coindesk.com/index/cc/v1/latest/tick?market=cadli&instruments=${pair.cryptocurrency}-${pair.currency}&apply_mapping=true`
  // console.log('URL:', url);
  const {data: {Data}} = await axios(url)
  // console.log(data); //* API OUPUT: {Data: USDT-EUR: {…}, Err: {…}}
  // console.log(Data); // * API OUTPUT: {BTC-MXN: {…}}
  // console.log(Data[`${pair.cryptocurrency}-${pair.currency}`]) // ! Llaves de la respuesta son dinamicas y cambian, ACCEDEMOS como la API nos da la respuesta para entrar a OBJETOS (en especial cuando tenemos variables)
  const ApiResponseObject = Data[`${pair.cryptocurrency}-${pair.currency}`]
  const result = ApiResponseSchema.safeParse(ApiResponseObject)
  // console.log(result); // * OUTPUT: {success: true, data: {…}} success porque retornamos todo en base al ESQUEMA

  if (result.success) {
    // console.log(result.data); // * OUTPUT: Informacion de mi ESQUEMA con Exito
    return result.data
  }
  
} 