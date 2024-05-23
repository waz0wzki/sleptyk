import { Component } from '@angular/core';
import { APPOINTMENT_LABELS } from '../models/appointment.labels';
import { FormsModule } from '@angular/forms';
import { KoszykService } from '../services/koszyk.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  protected appointmentLabels = APPOINTMENT_LABELS;
  protected chosenLabels = {} as any;
  protected language = 'french';
  protected date = new Date().toISOString().split('T')[0];
  protected todayDate = new Date().toISOString().split('T')[0];
  protected hour = '';

  constructor(private languageService: LanguageService) {}

  protected appointmentGroup = new FormGroup({
    appointmentType: new FormControl(''),
    appointmentDate: new FormControl(''),
    appointmentHour: new FormControl(''),
    appointmentName: new FormControl(''),
    appointmentSurname: new FormControl(''),
    appointmentPhone: new FormControl(''),
  });

  ngOnInit() {
    this.languageService.currentLanguage.subscribe((lang) => {
      this.language = lang;
      this.appointmentLabels.forEach((element) => {
        if (element.language == this.language) {
          this.chosenLabels = element;
          console.log(element);
        }
      });
      // this.changeLanguage(this.language);
    });
  }

  protected changeLanguage(language: string) {
    this.appointmentLabels.forEach((element) => {
      if (element.language == this.language) {
        this.chosenLabels = element;
        console.log(element);
      }
    });
  }

  protected submitAppointment() {
    console.log('dziura na siura', this.appointmentGroup.value);
  }
}
