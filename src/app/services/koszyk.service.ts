import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KoszykService {
  private itemsCountSource = new BehaviorSubject<number>(0);
  currentItemsCount = this.itemsCountSource.asObservable();

  changeItemsCount(count: number) {
    this.itemsCountSource.next(count);
    console.log(this.itemsCountSource.getValue(), 'cipka z dzemem');
  }

  getItemsCount(): Observable<number> {
    return this.currentItemsCount;
  }
}
