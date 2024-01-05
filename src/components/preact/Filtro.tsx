import { useEffect, useState } from 'preact/hooks';
import type { APIResponseResultsRecords, File } from '../../types/results.records.types';
import type { APIResponseSelects } from '../../types/selects.form.types';
import { parseQueryString } from '../../utils/querys-format';
import AddToCartFavForm from './Favorites/AddToCartFavForm';

const Filtro = () => {
    const [filters, setFilters] = useState({});
    const [results, setResults] = useState<APIResponseResultsRecords | null>(null);
    const [selectData, setSelectData] = useState<APIResponseSelects | null>(null);

    const PARAM_MAPPING = {
        barrio: 'barrio1',
        // Agrega aquí otros mapeos si es necesario
    };

    useEffect(() => {
        const fetchSelectData = async () => {
            try {
                const response = await fetch('/api/selects.json');
                const data: APIResponseSelects = await response.json();
                setSelectData(data);
            } catch (error) {
                console.error('Error al cargar datos para los selects:', error);
            }
        };

        fetchSelectData();
    }, []);

    const handleSelectChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        setFilters({ ...filters, [target.name]: target.value });
    };

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const url = new URL('/api/filters.json', window.location.origin);
        const browserUrl = new URL(window.location.href);

        url.search = '';
        browserUrl.search = '';

        Object.entries(filters).forEach(([key, value]) => {
            const PARAM_MAPPING: { [key: string]: string } = {
                barrio: 'barrios1',
                // Add other mappings here if necessary
            };
            const paramKey = PARAM_MAPPING[key] || key;
            if (value) {
                url.searchParams.append(paramKey, String(value));
                browserUrl.searchParams.append(key, String(value));
            }
        });

        window.history.pushState({}, '', browserUrl.toString());

        try {
            const response = await fetch(url.toString());
            const data: APIResponseResultsRecords = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };
    /* Boton de limpiar */
    const handleReset = () => {
        setFilters({});
        setResults(null);
        window.history.pushState({}, '', window.location.pathname) 
    };
    console.log(results)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {selectData && (
                    <>
                        {/* Ejemplo para 'barrio': */}
                        <select name="barrio" onChange={handleSelectChange}>
                            {selectData.resultado.barrio.map((option) => (
                                <option value={option.value}>{option.descripcion}</option>
                            ))}
                        </select>
                        {/* Repite para los demás filtros... */}
                    </>
                )}
                <button type="submit">Filtrar</button>\
                <button type="reset" onClick={handleReset}>Limpiar</button>
            </form>
            {/* Lista de resultados */}
            {results && (
                <>
                    {results.resultado.fichas.map((record: File) => (
                        <div class="p-4 bg-gray-500 text-white">
                            <div class="h-[170px] flex flex-col space-y-2">
                                <h3 class="h-100 text-lg font-semibold">
                                    {record.direccion_completa} - {record?.in_bar}
                                </h3>
                                <p class="h-100 text-sm">{record.titulo}</p>
                                <p class="h-100 text-sm">
                                    {record?.ambientes_num} Ambientes | {record?.dormitorios}
                                    Dormitorios
                                </p>
                                <div class="flex justify-between items-center">
                                    <span class="text-xs w-fit bg-slate-600 text-white px-2 py-1 rounded"
                                    >{record?.precio}</span>
                                    <div>
                                        <span class="text-xs w-fit bg-slate-600 text-white px-2 py-1 rounded"
                                        >{record?.in_suc}</span>
                                        <span class="text-xs w-fit bg-slate-600 text-white px-2 py-1 rounded"
                                        >{record?.in_num}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between items-end mt-3">
                                <div class="flex gap-1">
                                    <span class="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                    >{record.operacion}
                                    </span>
                                    {
                                        (
                                            <AddToCartFavForm item={record} >
                                                Fav
                                            </AddToCartFavForm>
                                        )
                                    }
                                </div>
                                <a
                                    href={`/search/detail/${record.in_num}/${parseQueryString(
                                        record?.direccion_completa
                                    )}`}
                                    data-astro-prefetch="hover"
                                    class="text-xs text-white cursor-pointer border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white"
                                >
                                    Ver más
                                </a>
                            </div>
                        </div>
                    ))}

                </>
            )}
        </div>
    );
};

export default Filtro;
