import { BehaviorSubject } from "rxjs";
import { map } from "rxjs";

interface Product {
  id: number;
  name: string;
  price: number;
}

class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  
  cart$ = this.cartSubject.asObservable();

  totalPrice$ = this.cart$.pipe(
    map(products => products.reduce((total, product) => total + product.price, 0))
  );

  addProduct(product: Product) {
    const currentCart = this.cartSubject.getValue();
    this.cartSubject.next([...currentCart, product]);
  }

  removeProduct(productId: number) {
    const updateCart = this.cartSubject.getValue().filter(p => p.id !== productId);
    this.cartSubject.next(updateCart);
  }
}

const cartService = new CartService();

cartService.cart$.subscribe(cart => {
  console.log('Корзина обновлена:', cart);
})

cartService.totalPrice$.subscribe(total => {
  console.log('Общая стоимость:', total);
})

cartService.addProduct({ id: 1, name: 'Ноутбук', price: 1000 });
cartService.addProduct({ id: 2, name: 'Мышка', price: 50 });

cartService.removeProduct(1);
