import type { JSX } from "preact/jsx-runtime";
import type { Option, Results } from "../../types/selects.form.types"
import FilterSelect from "./FilterSelect";

interface Props {
  selects: Results

}

const FormFilters = ({selects}:Props) => {
    const {barrio:ed_bar } = selects

    const barrios = ed_bar.filter(
  
      ({descripcion}:Option) => descripcion !== "INDISTINTO"
    ).map(({descripcion,value}:Option) => (
      { label: descripcion, value }
    ));

    const handleSelect: JSX.GenericEventHandler<HTMLElement> = (e) => {
      const { id, value } = e.target as HTMLSelectElement;
      const url = new URL(window.location.href);
      url.searchParams.set(id, value);
      window.history.pushState({}, "", url.toString());
  
      // Después de actualizar la URL, realizar el fetch con los nuevos parámetros
     /*  fetchData(); */
    };

  return (
    <>
        <form class="mb-4 w-100">
      <FilterSelect id="ed_bar" opts={barrios} onChange={handleSelect} />
  </form>
    </>

  )
}

export default FormFilters