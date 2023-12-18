
import { atom, map } from 'nanostores';
import { capitalize } from '../utils/formats';

export const isModalFavOpen = atom(false);
// Me dice si esta en la lista de favoritos devuelve un true o un false
export const isInFav = atom(false);

// CartItem Extend File interface 
export type FavItem = {
    in_suc: string;
    in_num: string;
    direccion_completa: string;
    in_bar: string;
    img_princ: string;
    operacion: string;
};

export const favItems = map<Record<string, FavItem>>({});

export function addCartFavItem({ in_suc, direccion_completa, in_num, in_bar, img_princ, operacion }: FavItem) {
    const existingEntry = favItems.get()[in_suc];
    // SI existe ya en favoritos no se agrega el item 
    if (existingEntry) {
        favItems.setKey(in_num, {
            ...existingEntry,
            in_suc,
            in_num,
            direccion_completa,
            in_bar,
            img_princ,
            operacion
        });

    } else {
        favItems.setKey(in_num, {
            in_suc,
            in_num,
            direccion_completa: capitalize(direccion_completa),
            in_bar,
            img_princ,
            operacion
        });
    }
}

// Remove item from cart

export function removeCartFavItem({ in_num }: FavItem) {
    console.log('removeCartFavItem', in_num)
    // Create a new Map from favItems
    const newFavItems = new Map<string, FavItem>(Object.entries(favItems.get()));
    // Delete from new Map by key 
    newFavItems.delete(in_num);
    // Set favItems to the new Map
    favItems.set(Object.fromEntries(newFavItems));

}


 