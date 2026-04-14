// * RFC para cargar componente pre-views
import { useState } from "react"
import { currencies } from "../data/data"
import { useCryptoStore } from "../store"
import type { PairInfer } from "../types/type"

export default function CriptoSearchForm() {

  const cryptos = useCryptoStore((state) => state.cryptoCurrencies)
  const [pair, setPair] = useState<PairInfer>({
    // * Son los name del Formulario:
    currency: '',
    cryptocurrency: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    e.preventDefault()
    setPair({
      ...pair,
      [e.target.name]: e.target.value // * Es mismo nombre de state y name del Form, asi se enlaza
    })
  }

  return (
    <form action="" className="form">
      <div className="field">
        <label htmlFor="currency">Moneda: </label>
        <select 
          name="currency" 
          id="currency"
          onChange={handleChange}
          >
          <option value="''">-- Seleccione una Opcion --</option>
          {
            currencies.map(currency => (
              <option  key={currency.code} value={currency.code}>{currency.name}</option>
            ))
          }
        </select>
      </div>

      <div className="field">
        <label htmlFor="criptocurrency">Criptomoneda: </label>
        <select 
          name="cryptocurrency" 
          id="cryptocurrency"
          onChange={handleChange}
        >
          <option value="''">-- Seleccione una Opcion --</option>
          {
            cryptos.map(crypto => (
              <option key={crypto.SYMBOL} value={crypto.SYMBOL}>{crypto.NAME}</option>
            ))
          }
        </select>
      </div>

      <input type="submit" value='Buscar' />
      
    </form>
  )
}
