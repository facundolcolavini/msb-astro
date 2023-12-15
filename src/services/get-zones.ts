import type { APIResponseGeoUbitaion } from "../types/geoubication.type";
import { fetchData } from "../utils/fetch-data";
const endpoint = 'geo.ubicaciones';
export const getZones = async (queryParams?:Record<string, string>):Promise<APIResponseGeoUbitaion> => {
    try {
        const res = await fetchData(endpoint, queryParams) as APIResponseGeoUbitaion;
        return res;

    } catch (error) {
        console.error('Error fetching Zone data:', error);
        throw error;
    }
}