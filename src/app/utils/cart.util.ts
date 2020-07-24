import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart-item.model';
export class CartUtil {
    
    
    public static get() : Cart {
        const data = localStorage.getItem('petshopcart');

        if (!data)
            return new Cart();

            return JSON.parse(data);
    }

    public static add(id: string, product: string, quantity: number, price: number, image: string[]) {

        const data = this.get();

        
        data.items.push(new CartItem(id, product, quantity, price, image));

        localStorage.setItem('petshopcart', JSON.stringify(data));
    }

    public static update(cart: Cart) {

        localStorage.setItem('petshopcart', JSON.stringify(cart));
    }

    public static clear() {

        localStorage.removeItem('petshopcart');
    }

}
