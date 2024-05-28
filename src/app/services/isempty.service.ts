import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IsEmptyService {
  isEmpty(obj: any) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return true;
  }
}
