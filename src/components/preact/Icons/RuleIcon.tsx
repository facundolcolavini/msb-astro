import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}
const RuleIcon = ({ addStyles, w = "16", h = "16" }: Props) => {
  const styles = twMerge(clsx("h-100 w-100 icon icon-tabler icon-tabler-ruler-2", addStyles));
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles} width={w} height={h} viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 3l4 4l-14 14l-4 -4z" /><path d="M16 7l-1.5 -1.5" /><path d="M13 10l-1.5 -1.5" /><path d="M10 13l-1.5 -1.5" /><path d="M7 16l-1.5 -1.5" /></svg>
  )
}

export default RuleIcon;
