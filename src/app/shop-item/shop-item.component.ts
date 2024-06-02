import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { ShopItemInterface } from '../interfaces/shopItem.interface';
import { Router } from '@angular/router';
import { ArrayService } from '../services/array.service';
import { KoszykService } from '../services/koszyk.service';
import { LanguageService } from '../services/language.service';
import { SHOP_ITEM_LABELS } from '../models/shop-item.labels';
import { CartItemInterface } from '../interfaces/cartItem.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss',
})
export class ShopItemComponent {
  constructor(
    private shopService: ShopService,
    private router: Router,
    private arrayService: ArrayService,
    private koszykService: KoszykService,
    private languageService: LanguageService
  ) {}
  // protected currentShopItem = {} as CartItemInterface;
  protected currentShopItem = {} as any;
  protected currentShopItemDesc = '';
  protected currentCart = [] as CartItemInterface[];
  protected localCart = [] as CartItemInterface[];
  protected shopItemLabels = SHOP_ITEM_LABELS;
  protected chosenShopItemLabels = [] as any;
  protected chosenColors = [] as string[];
  protected language = 'english';
  protected color = 'black' as string;
  protected itemShape = '';

  ngOnInit() {
    this.shopService.currentShopItem.subscribe(
      (shopItem: ShopItemInterface) => {
        this.currentShopItem = shopItem;

        if (this.arrayService.isEmpty(this.currentShopItem)) {
          this.router.navigate(['shop']);
        }
      }
    );
    this.koszykService.currentCart.subscribe((cart: CartItemInterface[]) => {
      this.currentCart = cart;
      console.log('el carto que tengo from service', this.currentCart);

      this.localCart = JSON.parse(JSON.stringify(this.currentCart));
    });

    this.languageService.currentLanguage.subscribe((lang) => {
      this.language = lang;
      this.changeLanguage(this.language);
      let smiec: any = this.currentShopItem;
      this.currentShopItemDesc = smiec.itemDesc[this.language];
      this.chosenColors = smiec.itemColor[this.language];
    });
  }

  addToCart() {
    let isIn = false;
    this.localCart.forEach((element) => {
      console.log('element from localcart', element);
      if (
        element.itemName == this.currentShopItem.itemName &&
        element.itemColor == this.color &&
        // element.itemShape == this.itemShape &&
        element.itemAmount &&
        element.itemColor
      ) {
        element.itemAmount++;
        element.itemValue += element.itemValue;
        isIn = true;
      }
    });
    if (!isIn) {
      let newItem = {} as CartItemInterface;
      newItem.itemAmount = 1;
      newItem.itemName = this.currentShopItem.itemName;
      newItem.itemColor = this.color;
      // newItem.itemShape = this.itemShape;
      newItem.itemBrand = this.currentShopItem.itemBrand;
      newItem.itemValue = this.currentShopItem.itemValue;
      newItem.itemImgUrl = this.currentShopItem.itemImgUrl;
      // newItem.itemAmount = 1;
      console.log('newo itemo', newItem);
      this.localCart.push(newItem);
    }
    console.log('itemo currento', this.currentShopItem);
    console.log('carto currento localo', this.localCart);
    this.koszykService.changeCart(this.localCart);
  }

  changeLanguage(language: string) {
    this.shopItemLabels.forEach((element) => {
      if (element.language == language) {
        this.chosenShopItemLabels = element;
        console.log(element);
      }
    });
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
