import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { ShopItemInterface } from '../interfaces/shopItem.interface';
import { Router } from '@angular/router';
import { SHOP_LABELS } from '../models/shop.labels';
import { LanguageService } from '../services/language.service';
import { ArrayService } from '../services/array.service';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  constructor(
    private shopService: ShopService,
    private router: Router,
    private languageService: LanguageService,
    private arrayService: ArrayService
  ) {}

  protected shop = [] as ShopItemInterface[];
  protected glasses = [] as ShopItemInterface[];
  protected contacts = [] as ShopItemInterface[];
  protected accesories = [] as ShopItemInterface[];
  protected chosenCategories = [] as ShopItemInterface[];
  protected filtered = [] as ShopItemInterface[];
  protected searched = [] as ShopItemInterface[];
  protected chosenCategory = '';
  protected shopLabels = SHOP_LABELS;
  protected chosenLabels = [] as any;
  protected language = 'english';
  protected brandFilters = [] as any;
  protected colorFilters = [] as any;
  protected shapeFilters = [] as any;
  protected genderFilters = [] as any;
  protected searchValue = '';
  protected priceMin = 0;
  protected priceMax = 1000;
  // protected priceFilters = [
  //   {
  //     value: '0-100',
  //     selected: false,
  //   },
  //   {
  //     value: '100-200',
  //     selected: false,
  //   },
  //   {
  //     value: '200-300',
  //     selected: false,
  //   },
  //   {
  //     value: '300-400',
  //     selected: false,
  //   },
  //   {
  //     value: '400-500',
  //     selected: false,
  //   },
  //   {
  //     value: '500+',
  //     selected: false,
  //   },
  // ];

  ngOnInit() {
    this.shopService.getShopItems().subscribe((shop: any) => {
      this.shop = shop;
      console.log('szop pracz', this.shop);
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
      this.makeFilters();
      this.applyFilters();
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
    this.makeFilters();
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
    this.makeFilters();
    this.applyFilters();
  }

  goToShopItem(shopItem: ShopItemInterface) {
    this.shopService.changeShopItem(shopItem);
    this.router.navigate(['shop-item']);
  }

  makeFilters() {
    this.brandFilters = [];
    this.genderFilters = [];
    this.colorFilters = [];
    this.shapeFilters = [];
    this.chosenCategories.forEach((element: any) => {
      console.log('el', element.itemBrand, 'arr', this.brandFilters);
      let filter = {} as any;
      filter.checkboxValue = element.itemBrand;
      filter.selected = false;
      if (!this.isInArray(this.brandFilters, filter)) {
        this.brandFilters.push(filter);
      }
      filter = {} as any;
      filter.checkboxValue = element.itemGender[this.language];
      filter.selected = false;
      if (!this.isInArray(this.genderFilters, filter)) {
        this.genderFilters.push(filter);
      }
      console.log('brand', element);
      filter = {} as any;
      element.itemColor[this.language].forEach((col: any) => {
        filter.checkboxValue = col;
        filter.selected = false;
        if (!this.isInArray(this.colorFilters, filter)) {
          this.colorFilters.push(filter);
        }
      });
      filter = {} as any;
      filter.checkboxValue = element.itemShape[this.language];
      filter.selected = false;
      if (!this.isInArray(this.shapeFilters, filter)) {
        this.shapeFilters.push(filter);
      }
    });
  }

  changeFilters(filterArray: any, filter: any) {
    filterArray[filter].selected = !filterArray[filter].selected;
    console.log('filter change', filterArray);
    this.applyFilters();
  }

  search() {
    // this.applyFilters();
    let searchedWords = [] as any;
    this.filtered.forEach((element: any) => {
      let pushItem = false;
      for (
        let i = 0;
        i <= element.itemName.length - this.searchValue.length;
        i++
      ) {
        pushItem = false;
        for (let j = 0; j < this.searchValue.length; j++) {
          if (this.searchValue[j] == element.itemName[i + j]) {
            pushItem = true;
            console.log(
              'buscando',
              this.searchValue[j] + ' ' + element.itemName[i + j]
            );
          } else {
            pushItem = false;
            break;
          }
        }
        if (pushItem) {
          if (!this.arrayService.isInArray(searchedWords, element)) {
            searchedWords.push(element);
          }
        }
      }
    });
    if (this.searchValue == '') {
      searchedWords = this.filtered;
    }
    this.searched = searchedWords;
  }

  allUnchecked(array: any) {
    let all = true;
    array.forEach((element: any) => {
      if (element.selected == true) {
        all = false;
      }
    });
    return all;
  }

  applyFilters() {
    let searchArray = this.chosenCategories;
    let filterArray = [] as any;
    if (this.allUnchecked(this.brandFilters)) {
      filterArray = searchArray;
    } else {
      searchArray.forEach((element) => {
        this.brandFilters.forEach((el: any) => {
          if (el.checkboxValue == element.itemBrand && el.selected) {
            filterArray.push(element);
          }
        });
      });
    }

    searchArray = filterArray;
    filterArray = [];

    if (this.allUnchecked(this.genderFilters)) {
      filterArray = searchArray;
    } else {
      searchArray.forEach((element: any) => {
        this.genderFilters.forEach((el: any) => {
          if (
            el.checkboxValue == element.itemGender[this.language] &&
            el.selected
          ) {
            filterArray.push(element);
          }
        });
      });
    }

    searchArray = filterArray;
    filterArray = [];

    if (this.allUnchecked(this.colorFilters)) {
      filterArray = searchArray;
    } else {
      searchArray.forEach((element: any) => {
        this.colorFilters.forEach((el: any) => {
          if (
            this.arrayService.isInArray(
              element.itemColor[this.language],
              el.checkboxValue
            ) &&
            el.selected
          ) {
            filterArray.push(element);
          }
        });
      });
    }

    searchArray = filterArray;
    filterArray = [];

    if (this.allUnchecked(this.shapeFilters)) {
      filterArray = searchArray;
    } else {
      searchArray.forEach((element: any) => {
        this.shapeFilters.forEach((el: any) => {
          if (
            el.checkboxValue == element.itemShape[this.language] &&
            el.selected
          ) {
            filterArray.push(element);
          }
        });
      });
    }

    searchArray = filterArray;
    filterArray = [];
    searchArray.forEach((element: any) => {
      if (
        element.itemValue >= this.priceMin &&
        element.itemValue <= this.priceMax
      ) {
        filterArray.push(element);
      }
    });
    searchArray = filterArray;
    this.filtered = searchArray;
    console.log('filtorwadlo', filterArray);
    this.search();
  }

  isInArray(array: any, item: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].checkboxValue == item.checkboxValue) {
        return true;
      }
    }
    return false;
  }
}
