import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ShopItemInterface } from '../interfaces/shopItem.interface';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private url = 'http://localhost:3000/shop';

  constructor(private http: HttpClient) {}

  getShopItems(): Observable<ShopItemInterface[]> {
    return this.http.get<ShopItemInterface[]>(this.url);
  }

  private shopItemSource = new BehaviorSubject<ShopItemInterface>(
    {} as ShopItemInterface
  );
  currentShopItem = this.shopItemSource.asObservable();

  changeShopItem(shopItem: ShopItemInterface) {
    this.shopItemSource.next(shopItem);
  }
}
