import { useStore } from '@nanostores/preact';
import { isModalFavOpen } from '../../../store/favoritesStore'; 

export default function FavModalButton() {
  // lee el valor del store con el hook `useStore`
  const $isModalOpen = useStore(isModalFavOpen);
  // escribe en el store importado usando `.set`
  return (
    <button onClick={() => isModalFavOpen.set(!$isModalOpen)}>Favoritos</button>
  )
}