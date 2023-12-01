import { getResultsRecords } from "../services/get-results-records"
import { fetchData } from "../utils/fetch-data"

export const GET = async ({ params, request }:any) => {
    console.log(params)
    try {
        const res = await fetchData('resultados.fichas');

        return new Response(JSON.stringify(res), { 
            headers: { 'content-type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Error fetching entrepreneurship data:', error);
        throw error;
    }
}