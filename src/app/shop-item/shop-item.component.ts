import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { CartItemInterface } from '../interfaces/cartItem.interface';
import { Router } from '@angular/router';
import { IsEmptyService } from '../services/isempty.service';
import { KoszykService } from '../services/koszyk.service';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss',
})
export class ShopItemComponent {
  constructor(
    private shopService: ShopService,
    private router: Router,
    private isEmptyService: IsEmptyService,
    private koszykService: KoszykService
  ) {}
  protected currentShopItem = {} as CartItemInterface;
  protected currentCart = [] as CartItemInterface[];
  protected localCart = [] as CartItemInterface[];

  ngOnInit() {
    this.shopService.currentCartItem.subscribe(
      (shopItem: CartItemInterface) => {
        this.currentShopItem = shopItem;
        if (this.isEmptyService.isEmpty(this.currentShopItem)) {
          this.router.navigate(['shop']);
        }
      }
    );
    this.koszykService.currentCart.subscribe((cart: CartItemInterface[]) => {
      this.currentCart = cart;
      console.log('elcarto', this.currentCart);

      this.localCart = JSON.parse(JSON.stringify(this.currentCart));
      // if (this.isEmptyService.isEmpty(this.currentCart)) {
      //   return;
      // }
      // this.currentCart.forEach((element) => {
      //   this.localCart.push(element);
      //   console.log('i have pushed', element);
      // });
    });
  }

  addToCart() {
    this.localCart.push(this.currentShopItem);
    console.log('itemo currento', this.currentShopItem);
    console.log('carto currento localo', this.localCart);
    this.koszykService.changeCart(this.localCart);
  }

  removeFromCart() {
    let elcart = [];
    for (let i = 0; i < this.localCart.length - 1; i++) {
      elcart.push(this.localCart[i]);
    }
    this.localCart = elcart;
    this.koszykService.changeCart(this.localCart);
  }
}
