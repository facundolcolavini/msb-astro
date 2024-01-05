import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import type { APIResponseSelects } from '../../types/selects.form.types';
import type { APIResponseResultsRecords, File } from '../../types/results.records.types';

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
                <button type="submit">Filtrar</button>
            </form>
            {/* Lista de resultados */}
            {results && (
                <>
                    {results.resultado.fichas.map((record: File) => (
                        <div class="lg:grid grid-cols-3">
                            <h2>{record.titulo}</h2>
                            <p>{record.direccion_completa}</p>
                            <img src={record.img_princ} alt={record.titulo} />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Filtro;
