import type { Neighborhood, Option, Value } from "../types/selects.form.types";

// Función para capitalizar la primera letra de cada palabra
export const capitalize = (str: string): string => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };


// Función para formatear los datos de los selectores hay casos en que viene como val el value
// Input: {description: string, value | val: string}[]
// Output: {label: string, value: string }[]

type InputOption = Option | Neighborhood | Value;
type OutputOption = { label: string, value: string };

export function formatOptions(options: InputOption[]): OutputOption[] {
  return options
    .filter(option => {
      const description = 'description' in option ? option.description : option.descripcion;
      const value = 'value' in option ? option.value : ('val' in option ? option.val : '');
      return !(description === "INDISTINTO" && value === "All" || description === "INDISTINTO" && option.val === "" || description === "TODAS" && value === "All") ;
    })
    .map((option) => {
      let description: string;
      let value: string;
      if ('description' in option) {
        description = option.description;
        value = option.value || '';
      } else if ('val' in option) {
        description = option.descripcion;
        value = option.val;
      } else {
        description = option.descripcion;
        value = option.value || '';
      }
      return {
        label: capitalize(description.toLowerCase()),
        value: value,
      };
    });
}

