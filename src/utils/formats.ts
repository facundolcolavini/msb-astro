// Función para capitalizar la primera letra de cada palabra
export const capitalize = (str: string): string => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };