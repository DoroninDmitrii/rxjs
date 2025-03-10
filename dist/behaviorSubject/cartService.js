import { BehaviorSubject } from "rxjs";
import { map } from "rxjs";
class CartService {
    constructor() {
        this.cartSubject = new BehaviorSubject([]);
        this.cart$ = this.cartSubject.asObservable();
        this.totalPrice$ = this.cart$.pipe(map(products => products.reduce((total, product) => total + product.price, 0)));
    }
    addProduct(product) {
        const currentCart = this.cartSubject.getValue();
        this.cartSubject.next([...currentCart, product]);
    }
    removeProduct(productId) {
        const updateCart = this.cartSubject.getValue().filter(p => p.id !== productId);
        this.cartSubject.next(updateCart);
    }
}
const cartService = new CartService();
cartService.cart$.subscribe(cart => {
    console.log('Корзина обновлена:', cart);
});
cartService.totalPrice$.subscribe(total => {
    console.log('Общая стоимость:', total);
});
cartService.addProduct({ id: 1, name: 'Ноутбук', price: 1000 });
cartService.addProduct({ id: 2, name: 'Мышка', price: 50 });
cartService.removeProduct(1);
