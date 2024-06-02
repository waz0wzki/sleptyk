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
    for (let element in array) {
      if (element == item) {
        return true;
      }
    }
    return false;
  }
}
