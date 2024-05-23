import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSource = new BehaviorSubject<string>('english');
  currentLanguage = this.languageSource.asObservable();

  changeLanguage(language: string) {
    this.languageSource.next(language);
  }
}
