import type { APIContext, APIRoute } from "astro";
import type { APIResponseResultsRecords } from "../types/results.records.types";

// Outputs: /builtwith.json
export const GET: APIRoute = async ( {params, request}) =>{
     async function getStaticProps() {
        const API_BASE_URL = 'https://xintel.com.ar/api?json=resultados.fichas&inm=MSB&apiK=DUDJETZ4CLD10ZQ0PIR3Y3R23';
        try {
          const response = await fetch(API_BASE_URL);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json() as APIResponseResultsRecords;
          return  data.resultado // Pasar los datos como propiedades al componente
        } catch (error) {
          console.error('Fetch error:', error);
          return  error 
        }
      }
        const data = await getStaticProps();
        
        return new Response(
            JSON.stringify(data),
            {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
            },
        )
    }
