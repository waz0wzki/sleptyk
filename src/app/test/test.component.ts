import { Component } from '@angular/core';
import { BadanieComponent } from '../badanie/badanie.component';
import { FormsModule } from '@angular/forms';
import { DoctorComponent } from '../doctor/doctor.component';

@Component({
  selector: 'app-test',
  standalone: true,
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  imports: [BadanieComponent, FormsModule, DoctorComponent],
})
export class TestComponent {
  // myRangeValue = 0.3;
  // myHighlightColor = '';
  // myRowsCount = 6;

  myLang = 'polish';
  myShowAppointmentDetails = true;
  myShowRepaiDetails = true;
  myShowConfirmation = true;
  changeAppoinments(item: any, value: any) {
    if (value == 'true') {
      item.setShowAppointmentDetails(true);
    } else {
      item.setShowAppointmentDetails(false);
    }
  }

  changeRepairs(item: any, value: any) {
    if (value == 'true') {
      item.setShowRepairDetails(true);
    } else {
      item.setShowRepairDetails(false);
    }
  }

  changeConfirmation(item: any, value: any) {
    if (value == 'true') {
      item.setShowConfirmation(true);
    } else {
      item.setShowConfirmation(false);
    }
  }
}
