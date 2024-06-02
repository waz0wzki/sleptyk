export interface ShopItemInterface {
  id: string;
  itemName: string;
  itemDesc: {
    polish: string;
    english: string;
    french: string;
  };
  itemValue: number;
  itemImgUrl: string;
  itemCategory: string;
  itemGender: string;
  itemBrand: string;
  itemAmount?: number;
  itemShape?: {
    polish: string[];
    english: string[];
    french: string[];
  };
  itemColor?: {
    polish: string[];
    english: string[];
    french: string[];
  };
}
