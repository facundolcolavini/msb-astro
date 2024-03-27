import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
    addStyles?: string;
    active?: boolean; // Nueva propiedad para indicar si el icono está activo
    w?: string;
    h?: string;
}

const BluePrintIcon = ({ addStyles, w = "24", h = "24" }: Props) => {
    const styles = twMerge(clsx("flex items-center h-100 w-100", addStyles));
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} className={styles} viewBox="0 0 512 512"><path d="M469.333 51.2H128c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533h341.333c13.875 0 25.6 11.725 25.6 25.6v375.467c0 14.353-11.238 25.6-25.6 25.6H51.2c-18.825 0-34.133-15.309-34.133-34.133 0-18.825 15.309-34.133 34.133-34.133s34.133 15.309 34.133 34.133a8.53 8.53 0 0 0 8.533 8.533 8.53 8.53 0 0 0 8.533-8.533V51.2C102.4 22.963 79.437 0 51.2 0S0 22.963 0 51.2v409.6C0 489.037 22.963 512 51.2 512h418.133C493.261 512 512 493.261 512 469.333V93.867C512 70.34 492.86 51.2 469.333 51.2zm-452.266 0c0-18.825 15.309-34.133 34.133-34.133S85.333 32.375 85.333 51.2v371.55c-9.071-8.149-21.018-13.15-34.133-13.15s-25.071 5-34.133 13.15V51.2z" /><path d="M349.867 443.733a8.53 8.53 0 0 0-8.533 8.533 8.53 8.53 0 0 0 8.533 8.533h102.4a8.53 8.53 0 0 0 8.533-8.533V110.933a8.53 8.53 0 0 0-8.533-8.533h-307.2a8.53 8.53 0 0 0-8.533 8.533v341.333a8.53 8.53 0 0 0 8.533 8.533h170.667a8.53 8.53 0 0 0 8.533-8.533c0-39.467 29.918-72.073 68.267-76.331v42.197a8.53 8.53 0 0 0 8.533 8.533 8.53 8.53 0 0 0 8.533-8.533v-51.2a8.53 8.53 0 0 0-8.533-8.533c-48.879 0-89.097 37.564-93.432 85.333H153.6V307.2h162.133a8.53 8.53 0 0 0 8.533-8.533v-34.133c0-4.71-3.814-8.533-8.533-8.533s-8.533 3.823-8.533 8.533v25.6H153.6V119.467h153.6V179.2c0 4.71 3.814 8.533 8.533 8.533s8.533-3.823 8.533-8.533v-59.733h119.467v170.667h-42.667c-4.719 0-8.533 3.823-8.533 8.533s3.814 8.533 8.533 8.533h42.667v136.533h-93.866z" /></svg>)
}

export default BluePrintIcon