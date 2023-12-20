
import { navigate } from 'astro:transitions/client';
import type { ChangeEvent, JSX } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

interface Props {
  zones: APIResponseGeoUbitaion[];
}

interface APIResponseGeoUbitaion {
  id: string;
  id_ozam: null;
  zona: string;
}

const FormSearch = ({ zones }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<APIResponseGeoUbitaion[]>([]);
  const [selectedZone, setSelectedZone] = useState<APIResponseGeoUbitaion | null>(null);
  const [isSearchEmpty, setIsSearchEmpty] = useState<boolean>(false);

  useEffect(() => {
    const debouncedSearch = debounce(search, 300);
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const debounce = (fn: (term: string) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(null, args as any), delay);
    };
  };

  const search = (term: string) => {
    if (term.trim() === '') {
      // Si el término de búsqueda está vacío, resetea los resultados
      setSearchResults([]);
      setIsSearchEmpty(false);
    } else {
      // Realiza la búsqueda solo si hay un término de búsqueda
      const results = zones
        ?.filter((zone) => zone.zona.toLowerCase().startsWith(term.toLowerCase()));

      // Check for duplicate keys
      const uniqueKeys = new Set(results.map((zone) => zone.id));
      if (uniqueKeys.size !== results.length) {
        console.error('Duplicate keys found in searchResults array.');
      }

      setSearchResults(results);
      setIsSearchEmpty(results.length === 0);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    setSearchTerm(input.value);
  };

  const handleOptionClick = (zone: APIResponseGeoUbitaion) => {
    setSelectedZone(zone);
    setSearchTerm(zone.zona); // Set the selected zone in the input
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (searchTerm.trim() === '') {
      // Campo vacío, muestra un mensaje de error
      setIsSearchEmpty(true);
    } else {
      // Realiza otras acciones según sea necesario

      // Reflejar los cambios en la URL 
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('codigo_ficha', selectedZone?.id || '');
      // Debe quedar en la misma direccion pero agregar el parametro de busqueda 
      window.history.pushState({}, '', `${window.location.pathname.replace(/\/$/, "")}/?` + searchParams.toString());
      navigate(window.location.pathname.replace(/\/$/, "") + '/?' + searchParams.toString());

    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto mt-8">
      <div className="flex items-center">
        <input
          type="text"
          value={searchTerm}
          onInput={handleInputChange}
          className={`w-full px-4 py-2 border rounded-l-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 ${isSearchEmpty ? 'border-red-500' : ''
            }`}
          placeholder="Search zone..."
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
        >
          Buscar
        </button>
      </div>
      {isSearchEmpty && (
        <div className="text-red-500 mt-1 text-sm">Campo obligatorio</div>
      )}
      {searchResults.length > 0 && (
        <div className="absolute left-0 mt-2 w-full max-h-60 overflow-auto rounded-md shadow-lg bg-white border border-gray-300 z-10">
          <div className="w-full py-2 text-base">
            {searchResults.map((zone) => (
              <button
                id={"codigo_ficha"}
                key={zone.id}
                onClick={() => handleOptionClick(zone)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 focus:outline-none"
              >
                {zone.zona}
              </button>
            ))}
          </div>
        </div>
      )}
      {isSearchEmpty && (
        <div className="absolute left-0 mt-2 w-full max-h-60 overflow-auto rounded-md shadow-lg bg-white border border-gray-300 z-10">
          <div className="w-full py-2 text-base">
            <div className="px-4 py-2">No hay resultados</div>
          </div>
        </div>
      )}
    </form>
  );
};

export default FormSearch;
