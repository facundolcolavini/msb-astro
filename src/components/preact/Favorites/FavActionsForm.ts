import { useStore } from '@nanostores/preact';
import type { ComponentChildren, JSX } from 'preact';
import { addCartFavItem, isInFav, isModalFavOpen, type FavItem } from '../../../store/favoritesStore';

type Props = {
	item: FavItem;
};

export default function FavActionForm({ item, children }: Props) {
	const $isInFav = useStore(isInFav);
	function addToCart(e: JSX.TargetedEvent<HTMLFormElement>) {
		e.preventDefault();
		isInFav.set(!$isInFav)
		addCartFavItem(item);
	}

	function removeToCart(e: JSX.TargetedEvent<HTMLFormElement>) {
		e.preventDefault();
		removeCartFavItem(item);
		isInFav.set(!$isInFav)
	
	}
	return (<form className={`text-xs  dark:bg-yellow-600 bg-transparent text-white px-2 py-1 rounded`} onSubmit={
        isInFav.set(!$isInFav) ? addToCart : removeToCart
    }>
    {
        isInFav.set(!$isInFav) && (
            <button className="flex items-center justify-center w-full h-full">
                {children}
            </button>
        )
    }
    </form>);
}