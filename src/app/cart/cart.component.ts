import { Component } from '@angular/core';
import { KoszykService } from '../services/koszyk.service';
import { CartItemInterface } from '../interfaces/cartItem.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private koszykService: KoszykService) {}

  protected currentCart = [] as CartItemInterface[];
  protected localCart = [] as CartItemInterface[];
  protected distinctCart: any;

  ngOnInit() {
    this.koszykService.currentCart.subscribe((cart: CartItemInterface[]) => {
      this.currentCart = cart;
      console.log('elcarto', this.currentCart);

      this.localCart = JSON.parse(JSON.stringify(this.currentCart));
      this.distinctCart = this.makeArrayUnique(this.localCart);
      // if (this.isEmptyService.isEmpty(this.currentCart)) {
      //   return;
      // }
      // this.currentCart.forEach((element) => {
      //   this.localCart.push(element);
      //   console.log('i have pushed', element);
      // });
    });
  }

  makeArrayUnique(arr: CartItemInterface[]): CartItemInterface[] {
    const seen = new Set<string>();
    return arr.filter((item) => {
      const compositeKey = `${item.id}-${item.itemName}`;
      if (!seen.has(compositeKey)) {
        seen.add(compositeKey);
        return true;
      }
      return false;
    });
  }
}
