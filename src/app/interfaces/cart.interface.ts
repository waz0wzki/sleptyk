import { CartItemInterface } from './cartItem.interface';

export interface CartInterface {
  id: string;
  cart: CartItemInterface[];
  cartValue: number;
}
