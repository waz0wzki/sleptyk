import { Component } from '@angular/core';
import { KoszykService } from '../services/koszyk.service';
import { CartItemInterface } from '../interfaces/cartItem.interface';
import { CART_LABELS } from '../models/cart.labels';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(
    private koszykService: KoszykService,
    private languageService: LanguageService
  ) {}

  protected currentCart = [] as CartItemInterface[];
  protected localCart = [] as CartItemInterface[];
  protected distinctCart: any;
  protected cartLabels = CART_LABELS;
  protected chosenLabels = [] as any;
  protected language = 'english';
  protected count = 0;
  protected sum = 0;

  ngOnInit() {
    this.koszykService.currentItemsCount.subscribe((count) => {
      this.count = count;
    });
    this.koszykService.currentCart.subscribe((cart: CartItemInterface[]) => {
      this.currentCart = cart;
      console.log('elcarto', this.currentCart);

      this.localCart = JSON.parse(JSON.stringify(this.currentCart));
      this.changeSum();

      // this.distinctCart = this.makeArrayUnique(this.localCart);
      // if (this.isEmptyService.isEmpty(this.currentCart)) {
      //   return;
      // }
      // this.currentCart.forEach((element) => {
      //   this.localCart.push(element);
      // console.log('i have pushed', element);
      // });
    });
    this.languageService.currentLanguage.subscribe((lang) => {
      this.language = lang;
      this.changeLanguage(this.language);
    });
  }

  changeLanguage(language: string) {
    this.cartLabels.forEach((element) => {
      if (element.language == language) {
        this.chosenLabels = element;
        console.log(element);
      }
    });
  }

  changeSum() {
    this.sum = 0;
    this.localCart.forEach((element) => {
      this.sum += element.itemValue;
    });
  }

  addToCart(itemIndex: any) {
    let gargamel = JSON.parse(JSON.stringify(this.localCart[itemIndex]));
    gargamel.itemValue += gargamel.itemValue / gargamel.itemAmount;
    gargamel.itemAmount++;

    this.currentCart[itemIndex].itemAmount = gargamel.itemAmount;
    this.currentCart[itemIndex].itemValue = gargamel.itemValue;
    this.koszykService.changeCart(this.currentCart);
  }

  removeFromCart(itemIndex: any) {
    let gargamel = JSON.parse(JSON.stringify(this.localCart[itemIndex]));
    gargamel.itemValue -= gargamel.itemValue / gargamel.itemAmount;
    gargamel.itemAmount--;

    let noweKregle = [] as any;
    if (gargamel.itemAmount == 0) {
      this.localCart.forEach((element: any, index: number) => {
        if (index != itemIndex) {
          noweKregle.push(element);
        }
      });
      this.localCart = noweKregle;
    } else {
      this.localCart[itemIndex].itemAmount = gargamel.itemAmount;
      this.localCart[itemIndex].itemValue = gargamel.itemValue;
    }

    this.koszykService.changeCart(this.localCart);
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
