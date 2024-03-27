import { f as fetchData } from './_id__4xNdbqBM.mjs';

const GET = async ({
  url
}) => {
  const queryParams = {};
  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  try {
    const data = await fetchData("fichas.destacadas", queryParams);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

export { GET };
