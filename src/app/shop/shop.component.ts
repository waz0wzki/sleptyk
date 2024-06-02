import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { ShopItemInterface } from '../interfaces/shopItem.interface';
import { Router } from '@angular/router';
import { SHOP_LABELS } from '../models/shop.labels';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  constructor(
    private shopService: ShopService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  protected shop = [] as ShopItemInterface[];
  protected glasses = [] as ShopItemInterface[];
  protected contacts = [] as ShopItemInterface[];
  protected accesories = [] as ShopItemInterface[];
  protected chosenCategories = [] as ShopItemInterface[];
  protected chosenCategory = '';
  protected shopLabels = SHOP_LABELS;
  protected chosenLabels = [] as any;
  protected language = 'english';

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

    this.languageService.currentLanguage.subscribe((lang) => {
      this.language = lang;
      this.changeLanguage(this.language);
    });
  }

  changeLanguage(language: string) {
    this.shopLabels.forEach((element) => {
      if (element.language == language) {
        this.chosenLabels = element;
        console.log(element);
      }
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

  goToShopItem(shopItem: ShopItemInterface) {
    this.shopService.changeShopItem(shopItem);
    this.router.navigate(['shop-item']);
  }
}
