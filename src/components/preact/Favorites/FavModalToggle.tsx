import { useStore } from '@nanostores/preact';
import { isModalFavOpen } from '../../../store/favoritesStore'; 

export default function FavModalToggle() {
  // lee el valor del store con el hook `useStore`
  const $isModalOpen = useStore(isModalFavOpen);
  // escribe en el store importado usando `.set`
  return (
    <button className={`text-blue-400 md:dark:text-blue-500`} onClick={() => isModalFavOpen.set(!$isModalOpen)}>Favoritos</button>
  )
}