import { navigate } from "astro:transitions/client";
import { useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import type { Option, Results } from "../../types/selects.form.types";
import { capitalize } from '../../utils/formats';
import FilterSelect from "./FilterSelect";


interface Props {
  selects: Results

}

const FormFilters = ({ selects }: Props) => {
  const { localidades: sellocalidades, barrio: barrios1, operacion: tipo_operacion, tipo: tipo_inmueble, ambientes: Ambientes, calles, valor } = selects
  // Obtener los valores de los filtros de la URL 
  const [urlSearchParams, setUrlSearchParams] = useState({});
  const [select, setSelect] = useState({});
  const { desde, hasta } = valor;

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

  const ope = tipo_operacion.filter(
    ({ descripcion }: Option) => descripcion !== "INDISTINTO"
  ).map(({ descripcion, value }: Option) => (
    { label: capitalize(descripcion.toLowerCase()), value }
  ));

  const tip = tipo_inmueble.filter(
    ({ descripcion }: Option) => descripcion !== "INDISTINTO"
  ).map(({ descripcion, value }: Option) => (
    { label: capitalize(descripcion.toLowerCase()), value }
  ));

  const amb = Ambientes.filter(
    ({ descripcion }: Option) => descripcion !== "INDISTINTO"
  ).map(({ descripcion, value }: Option) => (
    { label: capitalize(descripcion.toLowerCase()), value }
  ));

  const cal = calles.filter(
    ({ descripcion }: Option) => descripcion !== "INDISTINTO"
  ).map(({ descripcion, value }: Option) => (
    { label: capitalize(descripcion.toLowerCase()), value }
  ));

  const moneda = [
    { label: "$", value: "P" },
    { label: "U$S", value: "D" },
  ]

  // Min and max values 
  const min = desde.filter(
    ({ descripcion }) => descripcion !== "INDISTINTO"
  ).map(({ descripcion, val: value }) => (
    { label: capitalize(descripcion.toLowerCase()), value }
  ));

  const max = hasta.filter(
    ({ descripcion }) => descripcion !== "INDISTINTO"
  ).map(({ descripcion, val: value }) => (
    { label: capitalize(descripcion.toLowerCase()), value }
  ));

  const handleSelect: JSX.GenericEventHandler<HTMLElement> = (e) => {
    const { id, value } = e.target as HTMLSelectElement;
    if (id === "valor_minimo" || id === "valor_maximo") {
      if (value) {
        setSelect({ ...select, [id]: Number(value) });

        // Update URL with minPrice and maxPrice
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(id, value);
        window.history.pushState({}, '', '?' + searchParams.toString());
      }
    } else {
      setSelect({ ...select, [id]: value });
    }
  };

  // Actualizar los filtros de la URL para que se reflejen en la tabla
  const hanldeSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const newParams = { ...urlSearchParams, ...select };
    Object.keys(newParams).forEach((key) => {
      params.set(key, newParams[key as keyof typeof newParams]);
    });

    // Asegurar que no pase esto  => ///  debe ser asi https://msb-sh-dev.netlify.app/?sellocalidades=capital+federal
    // Remove trailing slash from pathname if it exists
    const pathname = window.location.pathname.replace(/\/$/, "");

    // Build the URL to navigate to
    const urlToNavigate = `${pathname}/?${params.toString()}`;

    // Clean the URL and navigate to it
    const urlToNavigateClean = urlToNavigate.replace(/\/\//g, "/")
    navigate(urlToNavigateClean);
    setUrlSearchParams({
      ...urlSearchParams, ...select
    });

  }

  // Boton para resetear los filtros de la URL y del formulario
  const handleReset = (e: Event) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    // Reload form 
    setTimeout(() => {
      setSelect({});
      setUrlSearchParams({});
      window.location.reload();
    }, 600)
    const urlToNavigateClean = window.location.pathname.replace(/\/\//g, "/")
    // Ir a la pathname de la URL actual 
    navigate(urlToNavigateClean);



  }
  return (

    <form id="form-filters" class="mb-4 w-100" onSubmit={hanldeSubmit}>
      <div class="grid grid-rows md:grid-cols-1 gap-2">
        <label class="text-white" htmlFor="tipo_operacion" id={"tipo_operacion"}>Operación:</label>
        <FilterSelect
          id="tipo_operacion"
          opts={ope}
          onChange={handleSelect}
          defaultOption={{ value: "All", label: "Seleccione una Operación" }}
        />

        <label class="text-white" htmlFor="tipo_inmueble" id={"tipo_inmueble"}>Tipo de Inmueble:</label>
        <FilterSelect
          id="tipo_inmueble"
          opts={tip}
          onChange={handleSelect}
          defaultOption={{ value: "All", label: "Seleccione un Inmueble" }}
        />
        <label class="text-white" htmlFor="Ambientes" id={"Ambientes"}>Ambientes:</label>
        <FilterSelect
          id="Ambientes"
          opts={amb}
          onChange={handleSelect}
          defaultOption={{ value: "All", label: "Seleccione los Ambientes" }}
        />
        <label htmlFor="sellocalidades" class="text-white">Localidad :</label>
        <FilterSelect
          id="sellocalidades"
          opts={locs}
          onChange={handleSelect}
          defaultOption={{ value: "All", label: "Seleccione una localidad" }}
        />

        <label class="text-white" htmlFor="barrios1" id={"barrios1"}>Barrios:     </label>
        <FilterSelect
          id="barrios1"
          opts={bar}
          onChange={handleSelect}
          defaultOption={{ value: "All", label: "Seleccione un barrio" }}
        />
        <label class="text-white" htmlFor="calles" id={"calles"}>Calle:</label>
        <FilterSelect
          id="calles"
          opts={cal}
          onChange={handleSelect}
          defaultOption={{ value: "All", label: "Seleccione los Ambientes" }}
        />
        <label class="text-white" htmlFor="moneda" id={"moneda"}>Moneda:</label>
        <FilterSelect
          id="moneda"
          opts={moneda}
          onChange={handleSelect}
          defaultOption={{ value: "All", label: "Seleccione la Moneda" }}
        />


      </div>
      <div class="grid grid-flow-col my-2">
        <span class="text-white flex items-center ">Valor:</span>
        <FilterSelect
          id="valor_minimo"
          opts={min}
          onChange={handleSelect}
          defaultOption={{ value: "All", label: "Mínimo" }}
        />

        <FilterSelect
          id="valor_maximo"
          opts={max}
          onChange={handleSelect}
        defaultOption={{ value: "All", label: "Máximo" }}
        />
      </div>

      <div class="flex justify-between items-center px-1 mt-5 gap-1">
        <button class="bg-[#768294] text-white px-4 py-2 rounded" type="button" onClick={handleReset}>Limpiar</button>
        <button type="submit" class="w-full p-2 text-white  rounded bg-blue-600 hover:bg-blue-700">Buscar</button>
      </div>
    </form>

  )
}

export default FormFilters