import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { KoszykService } from './services/koszyk.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [KoszykService],
})
export class AppComponent {
  title = 'sleptyk';
  constructor(private smiec: KoszykService) {}
  pierdolnica = 0;

  ngOnInit() {
    this.smiec.getItemsCount().subscribe((ures: any) => {
      // this.users = ures.user;
      this.pierdolnica = ures;
      console.log('smierdza mi jajka', this.pierdolnica);
    });

    // this.smiec.currentItemsCount.subscribe(
    //   (cwelownia: any) => (this.pierdolnica = cwelownia)
    // );
    // console.log('lkadsjflkajslkdjkadjkflaskldj', this.pierdolnica);
  }

  add(cwel: any) {
    this.smiec.changeItemsCount(this.pierdolnica + 1);
    console.log('add', this.pierdolnica);
    console.log('cipodron', cwel.itemsInCart);
  }

  sub(cwel: any) {
    this.smiec.changeItemsCount(this.pierdolnica - 1);
    console.log('sub', this.pierdolnica);
    console.log('cipodron', cwel.itemsInCart);
  }
}
