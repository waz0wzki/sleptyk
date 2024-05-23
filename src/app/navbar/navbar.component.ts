import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { KoszykService } from '../services/koszyk.service';
import { LanguageService } from '../services/language.service';
import { NAVBAR_LABELS, NAVBAR_LINKS } from '../models/navbar.labels';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private koszykService: KoszykService,
    private languageService: LanguageService
  ) {}
  // @Input() itemsInCart: number = 0;
  protected itemsInCart: any;
  protected chosenLabels = {} as any;
  protected navbarLabels = NAVBAR_LABELS;
  protected navbarLinks = NAVBAR_LINKS;
  protected language = '';
  protected languageShort = '';

  ngOnInit() {
    // this.koszykService.getItemsCount().subscribe((ures: any) => {
    //   // this.users = ures.user;
    //   this.itemsInCart = ures;
    //   console.log('dupsko jebie mi majonezem', this.itemsInCart, ures);
    // });

    this.koszykService.currentItemsCount.subscribe(
      (cwelownia: any) => (this.itemsInCart = cwelownia)
    );
    this.languageService.currentLanguage.subscribe((lang) => {
      this.language = lang;
      this.navbarLabels.forEach((element) => {
        if (element.language == this.language) {
          this.chosenLabels = element;
          console.log(element);
        }
      });
      // this.changeLanguage(this.language);
      this.changeShortLang(this.language);
    });

    // this.smiec.currentItemsCount.subscribe(
    //   (cwelownia: any) => (this.pierdolnica = cwelownia)
    // );
  }

  protected changeShortLang(lang: string) {
    switch (lang) {
      case 'polish':
        this.languageShort = 'pl';
        break;
      case 'english':
        this.languageShort = 'eng';
        break;
      case 'french':
        this.languageShort = 'fr';
        break;
    }
  }

  protected changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

  // navbaritems = [
  //   {
  //     label: 'Umów wizytę',
  //     routerLink: 'appointment',
  //   },
  //   {
  //     label: 'Serwis',
  //     routerLink: 'repair',
  //   },
  //   {
  //     label: 'Sklep',
  //     routerLink: 'shop',
  //   },
  //   {
  //     label: 'Strefa lekarza',
  //     routerLink: 'doctor',
  //   },
  //   {
  //     label: 'Koszyk ',
  //     routerLink: 'cart',
  //   },
  // ];
}
