import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { DoctorInterface } from '../interfaces/doctor.interface';
import { DOCTOR_LABELS } from '../models/doctor.labels';
import { LanguageService } from '../services/language.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { isEmpty } from 'rxjs';
import { APPOINTMENT_TYPE_LABELS } from '../models/appointmentType.labels';
import { AppointmentInterface } from '../interfaces/appointment.interface';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss',
})
export class DoctorComponent {
  protected currentDoctor = {} as DoctorInterface;
  protected loggedIn = false;
  protected doctorLabels = DOCTOR_LABELS;
  protected chosenLabels = {} as any;
  protected language = '';
  protected date = new Date().toISOString().split('T')[0];
  protected todayDate = new Date().toISOString().split('T')[0];
  protected hour = '';
  protected doctors = {} as DoctorInterface[];
  protected appointments = {} as AppointmentInterface[];
  protected currentDayAppointments = [] as any;
  protected appointmentTypeLabels = APPOINTMENT_TYPE_LABELS;
  protected currentAppointmentTypeLabels = [] as any;

  constructor(
    private doctorService: DoctorService,
    private languageService: LanguageService,
    private appointmentService: AppointmentService
  ) {}

  protected loginGroup = new FormGroup({
    loginId: new FormControl(''),
  });

  protected manageGroup = new FormGroup({
    manageDate: new FormControl(this.date),
  });

  protected repairGroup = new FormGroup({
    reportId: new FormControl(''),
    reportStatus: new FormControl(''),
  });

  ngOnInit() {
    this.doctorService.getDoctors().subscribe((docs) => {
      this.doctors = docs;
    });

    this.doctorService.currentDoctor.subscribe((doc) => {
      this.currentDoctor = doc;
      this.showAppointments(this.date);
    });

    if (!this.isEmpty(this.currentDoctor)) {
      this.loggedIn = true;
    }

    this.appointmentService.getAppointments().subscribe((appoints) => {
      this.appointments = appoints;
    });

    this.languageService.currentLanguage.subscribe((lang) => {
      this.language = lang;
      this.doctorLabels.forEach((element) => {
        if (element.language == this.language) {
          this.chosenLabels = element;
          console.log(element);
        }
      });
      this.appointmentTypeLabels.forEach((element) => {
        if (element.language == this.language) {
          this.currentAppointmentTypeLabels = element;
        }
      });
      // this.changeLanguage(this.language);
    });
  }

  submitLogin() {
    console.log(this.loginGroup.value);
    this.doctors.forEach((element) => {
      if (this.loginGroup.value.loginId == element.doctorId) {
        this.currentDoctor = element;
        this.doctorService.changeDoctor(element);
        this.loggedIn = true;
      }
    });
  }

  private isEmpty(obj: any) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  showAppointments(date: string) {
    if (this.isEmpty(this.appointments)) {
      return;
    }
    this.currentDayAppointments = [];
    this.appointments.forEach((element) => {
      if (element.date == date) {
        this.currentDayAppointments.push(element);
        console.log(
          'elemento',
          element.type,
          this.currentAppointmentTypeLabels.type[element.type]
        );
      }
    });
  }

  cancelAppointment(date: string, hour: string) {
    let currAppointment = {} as AppointmentInterface;
    this.appointments.forEach((element) => {
      if (element.date == date && element.hour == hour) {
        element.status = 'canceled';
        currAppointment = element;
      }
    });
    this.appointmentService.updateAppointment(currAppointment);
  }
}
