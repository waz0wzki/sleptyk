import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItemInterface } from '../interfaces/cartItem.interface';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private url = 'http://localhost:3000/shop';

  constructor(private http: HttpClient) {}

  getShopItems(): Observable<CartItemInterface[]> {
    return this.http.get<CartItemInterface[]>(this.url);
  }

  private shopItemSource = new BehaviorSubject<CartItemInterface>(
    {} as CartItemInterface
  );
  currentCartItem = this.shopItemSource.asObservable();

  changeShopItem(shopItem: CartItemInterface) {
    this.shopItemSource.next(shopItem);
  }
}
