import { navigate } from "astro:transitions/client";
import { useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import type { Option, Results } from "../../types/selects.form.types";
import FilterSelect from "./FilterSelect";


interface Props {
  selects: Results
  onFilter?: (e: Record<string, string>) => void
}

const FormFilters = ({ selects, onFilter }: Props) => {
  const { localidades: sellocalidades, barrio: barrios1 } = selects
  // Obtener los valores de los filtros de la URL 
  const [urlSearchParams, serUrlSearchParams] = useState({});
  const [select, setSelect] = useState({});
  
  const bar = barrios1.filter(
    ({ descripcion }: Option) => descripcion !== "INDISTINTO"
  ).map(({ descripcion, value }: Option) => (
    { label: descripcion, value }
  ));
  const locs = sellocalidades.filter(

    ({ descripcion }: Option) => descripcion !== "INDISTINTO"
  ).map(({ descripcion, value }: Option) => (
    { label: descripcion, value }
  ));

  const handleSelect: JSX.GenericEventHandler<HTMLElement> = (e) => {
    const { id, value } = e.target as HTMLSelectElement;
    setSelect({ ...select, [id]: value });
  };

  // Actualizar los filtros de la URL para que se reflejen en la tabla
  const hanldeSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const newParams = { ...urlSearchParams, ...select };
    Object.keys(newParams).forEach((key) => {
      params.set(key, newParams[key as keyof typeof newParams]);
    });

    url.search = params.toString();
    navigate(`/search/${params.toString()}`);
  }

  return (

    <form class="mb-4 w-100" onSubmit={hanldeSubmit}>
      <FilterSelect defaultOption={
        { label: "Localidad", value: "All" }
      } id="sellocalidades" opts={locs} onChange={handleSelect} />

      <FilterSelect defaultOption={
        { label: "Barrio", value: "All" }}
        id="barrios1" opts={bar} onChange={handleSelect} />
      <button type="submit" class="w-full p-2 rounded bg-blue-600 hover:bg-blue-700">Buscar</button>
    </form>


  )
}

export default FormFilters