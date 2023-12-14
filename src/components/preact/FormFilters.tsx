import { navigate } from "astro:transitions/client";
import { useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import type { Results } from "../../types/selects.form.types";
import { formatOptions } from '../../utils/formats';
import FilterSelect from "./FilterSelect";


interface Props {
  selects: Results

}

type SelectState = {
  in_num?: string;
  // incluye otras propiedades del estado 'select' aquí
};

const FormFilters = ({ selects }: Props) => {
  const { localidades: sellocalidades, barrio: barrios1, operacion: tipo_operacion, tipo: tipo_inmueble, ambientes: Ambientes, calles, valor } = selects
  // Obtener los valores de los filtros de la URL 
  const [urlSearchParams, setUrlSearchParams] = useState({});
  const [select, setSelect] = useState<SelectState>({ in_num: '' });
  const { desde, hasta } = valor;

  const bar = formatOptions(barrios1)
  const locs = formatOptions(sellocalidades)
  const ope = formatOptions(tipo_operacion)
  const tip = formatOptions(tipo_inmueble)
  const amb = formatOptions(Ambientes)
  const cal = formatOptions(calles)
  const monedas = formatOptions([
    { description: "$", value: "P" },
    { description: "U$S", value: "D" },
  ])
  const min = formatOptions(desde)
  const max = formatOptions(hasta)

  const handleSelect: JSX.GenericEventHandler<HTMLElement> = (e) => {
    const { id, value } = e.target as HTMLSelectElement;

    if (id === 'in_num') {
      setSelect({ ...select, [id]: value.startsWith('MS') ? value.slice(2) : value });
    } else if (id === "valor_minimo" || id === "valor_maximo") {
      if (value) {
        setSelect({ ...select, [id]: Number(value) });

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(id, value);
        window.history.pushState({}, '', '?' + searchParams.toString());
      }
    } else {
      setSelect({ ...select, [id]: value });
    }
  };

  const hanldeSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const newParams = { ...urlSearchParams, ...select };
    Object.keys(newParams).forEach((key) => {
      const value = newParams[key as keyof typeof newParams];
      params.set(key, value !== undefined ? value : '');
    });

    const pathname = window.location.pathname.replace(/\/$/, "");

    const urlToNavigate = `${pathname}/?${params.toString()}`;

    const urlToNavigateClean = urlToNavigate.replace(/\/\//g, "/")
    navigate(urlToNavigateClean);
    setUrlSearchParams({
      ...urlSearchParams, ...select
    });

  }

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
  
    navigate(urlToNavigateClean);
  }

  return (
    <form id="form-filters" class="mb-4 w-100" onSubmit={hanldeSubmit}>
      <div class="grid grid-rows md:grid-cols-1 gap-2">
        {/* Agregar buscador que busque por localidad barrio calle */}
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



      </div>
      <span class="text-white flex items-center ">Valor:</span>
      <div class="grid grid-flow-col my-2">

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
      <div class="grid grid-flow-col my-2">

        <FilterSelect
          id="moneda"
          opts={monedas}
          onChange={handleSelect}
          defaultOption={{ value: "All", label: "Moneda" }}
        />
        <div className="relative m-1">
          <span className="absolute left-2 bottom-3 text-gray-500">MS</span>
          <input
            id="in_num"
            className="form-input block w-full py-2 items-center px-3 pl-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="text"
            placeholder={"Ingrese el código"}
            value={`${select.in_num ||
              ''}`}
            onChange={handleSelect}
          />
        </div>

      </div>
      <div class="flex justify-between items-center px-1 mt-5 gap-1">
        <button class="bg-[#768294] text-white px-4 py-2 rounded" type="button" onClick={handleReset}>Limpiar</button>
        <button type="submit" class="w-full p-2 text-white  rounded bg-blue-600 hover:bg-blue-700">Buscar</button>
      </div>
    </form>

  )
}

export default FormFilters