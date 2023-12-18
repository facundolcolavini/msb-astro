import type { ComponentChildren, JSX } from 'preact';
import {  removeCartFavItem, type FavItem } from '../../../store/favoritesStore';

type Props = {
	item: FavItem;
	children: ComponentChildren;
};

export default function RemoveFromCartFavForm({ item, children }: Props) {
	function removeToCart(e: JSX.TargetedEvent<HTMLFormElement>) {
		e.preventDefault();
		removeCartFavItem(item);
		
	}

	return <form className={`text-xs  dark:bg-red-600 bg-transparent text-white px-2 py-1 rounded`} onSubmit={removeToCart}>{children}</form>;
}