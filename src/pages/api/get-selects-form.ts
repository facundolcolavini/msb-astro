import type { APIResponseSelects, Results } from "../../types/selects.form.types";
import { fetchData } from "../../utils/fetch-data";

const endpoint = 'datos.select.buscador';

export const getAllSelects = async (): Promise<Results> => {
    try{
        const res = await fetchData(endpoint) as APIResponseSelects;
        return res.resultado;
    } catch (error) {
        console.error('Error fetching selects data:', error);
        throw error;
    }
}