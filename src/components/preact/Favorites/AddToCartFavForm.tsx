import { useStore } from '@nanostores/preact';
import type { ComponentChildren, JSX } from 'preact';
import { addCartFavItem, isInFav, isModalFavOpen, type FavItem } from '../../../store/favoritesStore';

type Props = {
	item: FavItem;
	children: ComponentChildren;
};

export default function AddToCartFavForm({ item, children }: Props) {
	const $isInFav = useStore(isInFav);
	function addToCart(e: JSX.TargetedEvent<HTMLFormElement>) {
		e.preventDefault();
		isInFav.set(!$isInFav)
		addCartFavItem(item);
	}


	return <form className={`text-xs  dark:bg-yellow-600 bg-transparent text-white px-2 py-1 rounded`} onSubmit={addToCart}>{children}</form>;
}