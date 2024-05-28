import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { CartItemInterface } from '../interfaces/cartItem.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  constructor(private shopService: ShopService, private router: Router) {}

  protected shop = [] as CartItemInterface[];
  protected glasses = [] as CartItemInterface[];
  protected contacts = [] as CartItemInterface[];
  protected accesories = [] as CartItemInterface[];
  protected chosenCategories = [] as CartItemInterface[];
  protected chosenCategory = '';

  ngOnInit() {
    this.shopService.getShopItems().subscribe((shop: any) => {
      this.shop = shop;
      console.log('szop sracz', this.shop);
      this.shop.forEach((element) => {
        switch (element.itemCategory) {
          case 'glasses':
            this.glasses.push(element);
            break;
          case 'contacts':
            this.contacts.push(element);
            break;
          case 'accesories':
            this.accesories.push(element);
            break;
        }
      });
      console.log('shop', this.shop);
      console.log('glasses', this.glasses);
      this.changeCategory('glasses');
    });
  }

  changeCategory(category: string) {
    switch (category) {
      case 'glasses':
        this.chosenCategories = this.glasses;
        break;
      case 'contacts':
        this.chosenCategories = this.contacts;
        break;
      case 'accesories':
        this.chosenCategories = this.accesories;
        break;
    }
  }

  goToCartItem(cartItem: CartItemInterface) {
    this.shopService.changeShopItem(cartItem);
    this.router.navigate(['shop-item']);
  }
}
