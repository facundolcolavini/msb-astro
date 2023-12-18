import { useStore } from '@nanostores/preact';
import { favItems, isModalFavOpen, removeCartFavItem } from '../../../store/favoritesStore';

export default function CartFav() {
	const $isModalFavOpen = useStore(isModalFavOpen);
	const $favItems = useStore(favItems);

	return (
		<aside hidden={!$isModalFavOpen} className="fixed right-0 top-0 h-screen px-8 min-w-[300px] lg:min-w-[600px] border-[#color-bg-3] bg-[#010132] text-white animate-slide">
			<header className="flex justify-between text-2xl my-5">
				<h2>Favoritos</h2>
				<button onClick={() => isModalFavOpen.set(false)} aria-label="Close modal">
					&times;
				</button>
			</header>
			{Object.values($favItems).length ? (
				<ul className="list-none p-0 overflow-auto max-h-[calc(100vh-5rem)]" role="list">

					{Object.values($favItems).map((favItem) => (
						
						<li className="flex gap-4 items-center mb-4 bg-white text-black p-4 rounded-lg animate-fadeIn">
							{/* Button delete */}
							<button className="text-red-500 text-2xl items-center" onClick={
								() => {
									removeCartFavItem(favItem);
								}
							} aria-label="Close modal">
								&times;
							</button>
							<img className="w-16 h-16 object-cover rounded-lg" src={favItem.img_princ} alt={favItem.in_bar} />
							<div>
								<h3 className="font-bold"> {favItem.in_bar} - {favItem?.direccion_completa}</h3>
								<p className="text-xs bg-blue-500 w-fit text-white px-2 py-1 rounded">{favItem.operacion}</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="mt-5">Tu lista de favoritos esta vacia!</p>
			)}
		</aside>
	);
}