import type { JSX } from "preact/jsx-runtime";
import {useState} from "preact/hooks"
import type { Option, Results } from "../../types/selects.form.types"
import FilterSelect from "./FilterSelect";
import { navigate } from "astro:transitions/client";
import { fetchData } from "../../utils/fetch-data.ts";

interface Props {
  selects: Results
  onFilter? : (e:Record<string, string>) => void
}

const FormFilters = ({selects,onFilter}:Props) => {
    const {localidades:sellocalidad } = selects
  // Obtener los valores de los filtros de la URL 
  const [urlSearchParams, serUrlSearchParams] = useState({});

    const locs = sellocalidad.filter(
  
      ({descripcion}:Option) => descripcion !== "INDISTINTO"
    ).map(({descripcion,value}:Option) => (
      { label: descripcion, value }
    ));

    const handleSelect: JSX.GenericEventHandler<HTMLElement> = (e) => {
      const { id, value } = e.target as HTMLSelectElement;
      const url = new URL(window.location.href);
      const searchParams = url.searchParams.set(id, value);
      window.history.pushState({}, "", url.toString());
      serUrlSearchParams( url.search ? url.search : {})
    };
    
    // Actualizar los filtros de la URL para que se reflejen en la tabla
    const hanldeSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
      e.preventDefault();

      // fetch data with params
       const newData = await fetchData('resultados.fichas'); // Problemas con cors
       console.log(newData)
    } 

  return (

        <form class="mb-4 w-100" onSubmit={hanldeSubmit}>
      <FilterSelect id="sellocalidad" opts={locs} onChange={handleSelect} />
      <button type="submit" class="w-full p-2 rounded bg-blue-600 hover:bg-blue-700">Buscar</button>
  </form>


  )
}

export default FormFilters