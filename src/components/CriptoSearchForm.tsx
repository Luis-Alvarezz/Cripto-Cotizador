// * RFC para cargar componente pre-views
import { useState } from "react"
import { currencies } from "../data/data"
import { useCryptoStore } from "../store"
import type { PairInfer } from "../types/type"
import ErrorMessage from "./ErrorMessage"

export default function CriptoSearchForm() {

  const cryptos = useCryptoStore((state) => state.cryptoCurrencies)
  const fetchData = useCryptoStore((state) => state.fetchData)
  
  const initialState = { 
    // * Son los name del Formulario:
    currency: '', 
    cryptocurrency: ''
  }

  const [pair, setPair] = useState<PairInfer>(initialState)

  const [error, setError] = useState<PairInfer>(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value // * Es mismo nombre de state y name del Form, asi se enlaza
    })
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newError = {
      ...initialState
    }

    if (pair.currency === '') {
      newError.currency = 'El campo Moneda es Obligatorio'
    }
    if (pair.cryptocurrency === '') {
      newError.cryptocurrency = 'El campo Criptomoneda es Obligatorio'
    }
    setError(newError)

    setTimeout(() => {
      setError(initialState)
    }, 3000)

    // * Consultar la API para calcular Cryto a Moneda local
    fetchData(pair)
  }

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="currency">Moneda: </label>
        <select
          name="currency"
          id="currency"
          onChange={handleChange}
          value={pair.currency} // ! Para settear el valor del INPUT en el STATE
        >
          <option value="">-- Seleccione una Opcion --</option>
          {
            currencies.map(currency => (
              <option key={currency.code} value={currency.code}>{currency.name}</option>
            ))
          }
        </select>
      </div>
      {
        error.currency && (
          <ErrorMessage>{error.currency}</ErrorMessage>
        )
      }


      <div className="field">
        <label htmlFor="criptocurrency">Criptomoneda: </label>
        <select
          name="cryptocurrency"
          id="cryptocurrency"
          onChange={handleChange}
          value={pair.cryptocurrency}
        >
          <option value="">-- Seleccione una Opcion --</option>
          {
            cryptos.map(crypto => (
              <option key={crypto.SYMBOL} value={crypto.SYMBOL}>{crypto.NAME}</option>
            ))
          }
        </select>
      </div>
      {
        error.cryptocurrency && (
          <ErrorMessage>{error.cryptocurrency}</ErrorMessage>
        )
      }

      <input type="submit" value='Buscar' />

    </form>
  )
}
