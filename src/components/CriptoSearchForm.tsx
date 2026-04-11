// * RFC para cargar componente pre-view

export default function CriptoSearchForm() {
  return (
    <form action="" className="form">
      <div className="field">
        <label htmlFor="currency">Moneda: </label>
        <select 
          name="currency" 
          id="currency"
          >
          <option value="''">-- Seleccione una Opcion --</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="criptocurrency">Criptomoneda: </label>
        <select 
          name="criptocurrency" 
          id="criptocurrency"
        >
          <option value="''">-- Seleccione una Opcion --</option>
        </select>
      </div>

      <input type="submit" value='Buscar' />
      
    </form>
  )
}
