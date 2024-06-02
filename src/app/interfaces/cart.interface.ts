import { ShopItemInterface } from './shopItem.interface';

export interface CartInterface {
  id: string;
  cart: ShopItemInterface[];
  cartValue: number;
}
