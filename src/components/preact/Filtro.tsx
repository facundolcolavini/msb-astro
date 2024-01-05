import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import type { APIResponseSelects } from '../../types/selects.form.types';
import type { APIResponseResultsRecords, File } from '../../types/results.records.types';
const PARAM_MAPPING = {
    barrio: 'barrio1',
    // Añade aquí otros mapeos si es necesario
};

const Filtro = () => {
    const [filters, setFilters] = useState({
        // Inicializa tus filtros aquí
    });

    console.log(filters)
    const [results, setResults] = useState<APIResponseResultsRecords | null>(null);
    const [selectData, setSelectData] = useState<APIResponseSelects | null>(null);

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
    
        // Construye los parámetros de búsqueda
        Object.entries(filters).forEach(([key, value ]) => {
            if (value) {
                url.searchParams.append(key, String(value));
            }
        });
    
        try {
            const response = await fetch(url.toString());
            const data: APIResponseResultsRecords = await response.json();
            setResults(data);
            console.log(data);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            {selectData && (
                <>
                    {/* Ejemplo para 'barrio': */}
                    <select name="barrios1" onChange={handleSelectChange}>
                        {selectData.resultado.barrio.map((option) => (
                            <option value={option.value}>{option.descripcion}</option>
                        ))}
                    </select>
                    {/* Repite para los demás filtros... */}
                </>
            )}
            <button type="submit">Filtrar</button>
        </form>
    {/* List data */}
    {results && (
        <>
            {results.resultado.fichas.map((record:File) => (
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
