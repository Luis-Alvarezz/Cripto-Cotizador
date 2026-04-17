import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"

export default function CryptoPriceDisplay() {
  const resultAPI = useCryptoStore(state => state.APIResponse)
  const spinner = useCryptoStore(state => state.loading)
  // const { VALUE } = resultAPI

  // const hasResult = useMemo(() => Object.values(resultAPI).length > 0 && !Object.values(resultAPI).includes(''), [resultAPI]) // * Object.values({}) devuelve un arreglo vacío []
  // * Al evaluar [].includes('') , el resultado es false
  const hasResult = useMemo(() => Object.values(resultAPI).length > 0 && Object.values(resultAPI).every(value => value !== '' && value !== null && value !== undefined), [resultAPI]) // * Object.values({}) devuelve un arreglo vacío []

  // const convertToDate = (time: number) => {
  //   const date = new Date(time * 1000)
  //   return date
  // }
  const convertToDate = (time: number) => new Date(time).toUTCString()
   
  
  return (
    <div className="result-wrapper">
      {
        spinner ? <Spinner /> :
        hasResult && (
          <>
            <h2>Cotización</h2>
            <div className="apiresponseschema">
              {/* <img src={`https://`} alt="" /> */}
              <div>
                <p>Valor de la Crypto: <span>{resultAPI.VALUE}</span></p>
                <p>Precio más alto de día: <span>{resultAPI.CURRENT_DAY_HIGH}</span></p>
                <p>Precio más bajo del día: <span>{resultAPI.CURRENT_DAY_LOW}</span></p>
                <p>Nombre de la Crypto: <span>{resultAPI.INSTRUMENT}</span></p>
                <p>Varianza de día: <span>{resultAPI.CURRENT_DAY_CHANGE}</span></p>
                <p>Fecha de actualizado: <span>{convertToDate(resultAPI.VALUE_LAST_UPDATE_TS)}</span></p>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}
