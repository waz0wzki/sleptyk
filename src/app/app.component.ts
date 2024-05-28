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
  constructor(private koszykService: KoszykService) {}
  cartItemCount = 0;

  ngOnInit() {
    this.koszykService.getItemsCount().subscribe((itemsCount: any) => {
      this.cartItemCount = itemsCount;
    });
  }
}
