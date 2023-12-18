import { isModalFavOpen,addCartFavItem, type FavItem, isItemInFavorites, isInListOfFav, removeCartFavItem } from '../../../store/favoritesStore';
import type { ComponentChildren, JSX } from 'preact';

type Props = {
	item: FavItem;
	children: ComponentChildren;
};

export default function AddToCartFavForm({ item, children }: Props) {
	function addToCart(e: JSX.TargetedEvent<HTMLFormElement>) {
		e.preventDefault();
		isModalFavOpen.set(true);
		addCartFavItem(item);
		
	}


	return <form className={`text-xs  dark:bg-yellow-600 bg-transparent text-white px-2 py-1 rounded`} onSubmit={addToCart}>{children}</form>;
}