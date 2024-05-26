import { Component } from '@angular/core';
import { APPOINTMENT_LABELS } from '../models/appointment.labels';
import { FormsModule } from '@angular/forms';
import { KoszykService } from '../services/koszyk.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { AppointmentService } from '../services/appointment.service';
import { AppointmentInterface } from '../interfaces/appointment.interface';
import { PatientInterface } from '../interfaces/patient.interface';

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
  protected appointments = {} as AppointmentInterface[];
  protected currentDayAppointments = [] as AppointmentInterface[];

  constructor(
    private languageService: LanguageService,
    private appointmentService: AppointmentService
  ) {}

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

    this.appointmentService.getAppointments().subscribe((appoints) => {
      this.appointments = appoints;
      this.showAppointments(this.date);
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
    this.addAppointment();
  }

  protected showAppointments(date: string) {
    this.currentDayAppointments = [];
    this.appointments.forEach((element) => {
      if (element.date == date && element.status == 'free') {
        this.currentDayAppointments.push(element);
      }
    });
    console.log('appuntamento', this.currentDayAppointments);
  }

  // appointmentType: new FormControl(''),
  // appointmentDate: new FormControl(''),
  // appointmentHour: new FormControl(''),
  // appointmentName: new FormControl(''),
  // appointmentSurname: new FormControl(''),
  // appointmentPhone: new FormControl(''),

  protected addAppointment() {
    let newAppointment = {} as AppointmentInterface;
    let newPatient = {} as PatientInterface;
    console.log('faszka czaszka', this.appointmentGroup.value);
    if (
      !this.appointmentGroup.value.appointmentDate ||
      !this.appointmentGroup.value.appointmentHour ||
      !this.appointmentGroup.value.appointmentName ||
      !this.appointmentGroup.value.appointmentSurname ||
      !this.appointmentGroup.value.appointmentPhone ||
      !this.appointmentGroup.value.appointmentType
    ) {
      console.log('obsralem zbroje');
      return;
    }
    newAppointment.date = this.appointmentGroup.value.appointmentDate;
    newAppointment.hour = this.appointmentGroup.value.appointmentHour;
    newPatient.name = this.appointmentGroup.value.appointmentName;
    newPatient.surname = this.appointmentGroup.value.appointmentSurname;
    newPatient.phone = this.appointmentGroup.value.appointmentPhone;
    newAppointment.patient = newPatient;
    newAppointment.status = 'confirmed';
    newAppointment.type =
      this.appointmentGroup.value.appointmentType.toString();

    console.log('appuntamento e qui vero', newAppointment);
    this.appointmentService.updateAppointment(newAppointment);
  }
}
