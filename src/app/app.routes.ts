import { Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { RepairComponent } from './repair/repair.component';
import { BadanieComponent } from './badanie/badanie.component';
import { TestComponent } from './test/test.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { ShopItemComponent } from './shop-item/shop-item.component';

export const routes: Routes = [
  {
    path: 'appointment',
    component: AppointmentComponent,
  },
  {
    path: 'repair',
    component: RepairComponent,
  },
  {
    path: 'badanie',
    component: BadanieComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'doctor',
    component: DoctorComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'shop-item',
    component: ShopItemComponent,
  },
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
];
