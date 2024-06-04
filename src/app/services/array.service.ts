import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArrayService {
  isEmpty(obj: any) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  isInArray(array: any, item: any) {
    // for (let element in array) {
    //   if (element == item) {
    //     console.log('true', element, 'and', item);
    //     return true;
    //   }
    // }
    for (let i = 0; i < array.length; i++) {
      if (array[i] == item) {
        console.log('true', array[i], 'and', item);
        return true;
      }
    }
    console.log(false, array, item);
    return false;
  }
}
