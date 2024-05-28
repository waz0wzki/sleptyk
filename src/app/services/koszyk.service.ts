import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemInterface } from '../interfaces/cartItem.interface';

@Injectable({
  providedIn: 'root',
})
export class KoszykService {
  private itemsCountSource = new BehaviorSubject<number>(0);
  currentItemsCount = this.itemsCountSource.asObservable();

  changeItemsCount(count: number) {
    this.itemsCountSource.next(count);
  }

  private cartSource = new BehaviorSubject<CartItemInterface[]>(
    [] as CartItemInterface[]
  );
  currentCart = this.cartSource.asObservable();

  changeCart(cart: CartItemInterface[]) {
    console.log('lengtho', cart);
    this.cartSource.next(cart);
    this.changeItemsCount(cart.length);
  }

  getItemsCount(): Observable<number> {
    return this.currentItemsCount;
  }
}
