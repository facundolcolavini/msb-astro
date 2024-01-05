
// src/routes/api/filters.ts

import type { APIRoute } from 'astro';
import { fetchData } from '../../utils/fetch-data';



export const GET: APIRoute = async ({ url }) => {
    // Extrae los parámetros de consulta de la URL
    const queryParams: Record<string, string | number> = {};

    url.searchParams.forEach((value, key) => {
        queryParams[key] = value;
    });

    try {
        const data = await fetchData('resultados.fichas', queryParams);
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
