import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { DoctorInterface } from '../interfaces/doctor.interface';
import { DOCTOR_LABELS } from '../models/doctor.labels';
import { LanguageService } from '../services/language.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, isEmpty } from 'rxjs';
import { APPOINTMENT_TYPE_LABELS } from '../models/appointmentType.labels';
import { AppointmentInterface } from '../interfaces/appointment.interface';
import { AppointmentService } from '../services/appointment.service';
import { RepairService } from '../services/repair.service';
import { RepairInterface } from '../interfaces/repair.interface';
import { REPAIR_STATUS_LABELS } from '../models/repairStatus.labels';
import { REPAIR_TYPE_LABELS } from '../models/repairType.labels';
import { ArrayService } from '../services/array.service';

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
  protected doctors = [] as DoctorInterface[];
  protected appointments = [] as AppointmentInterface[];
  protected currentDayAppointments = [] as any;
  protected appointmentTypeLabels = APPOINTMENT_TYPE_LABELS;
  protected currentAppointmentTypeLabels = [] as any;
  protected repairs = [] as RepairInterface[];
  protected currentRepair = {} as RepairInterface;
  protected repairStatusLabels = REPAIR_STATUS_LABELS;
  protected currentRepairStatusLabels = [] as any;
  protected repairTypeLabels = REPAIR_TYPE_LABELS;
  protected currentRepairTypeLabels = [] as any;
  protected showConfirmation = true;
  protected showRepairDetails = true;
  protected showAppointmentDetails = true;
  protected THEshowRepairDetails: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.showRepairDetails);
  protected THEshowAppoinmentDetails: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.showAppointmentDetails);

  constructor(
    private doctorService: DoctorService,
    private languageService: LanguageService,
    private appointmentService: AppointmentService,
    private repairService: RepairService,
    private arrayService: ArrayService
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
    reportPhone: new FormControl(''),
    reportDesc: new FormControl(''),
    reportDate: new FormControl(''),
  });

  ngOnInit() {
    this.doctorService.getDoctors().subscribe((docs) => {
      this.doctors = docs;
    });

    this.doctorService.currentDoctor.subscribe((doc) => {
      this.currentDoctor = doc;
      this.showAppointments(this.date);
    });

    if (!this.arrayService.isEmpty(this.currentDoctor)) {
      this.loggedIn = true;
    }

    this.appointmentService.getAppointments().subscribe((appoints) => {
      this.appointments = appoints;
    });

    this.repairService.getRepairs().subscribe((reps) => {
      this.repairs = reps;
      console.log(this.repairs);
    });

    this.languageService.currentLanguage.subscribe((lang) => {
      this.language = lang;
      this.changeLanguage(this.language);

      this.appointmentTypeLabels.forEach((element) => {
        if (element.language == this.language) {
          this.currentAppointmentTypeLabels = element;
          console.log('app', element);
        }
      });
      this.repairStatusLabels.forEach((element) => {
        if (element.language == this.language) {
          this.currentRepairStatusLabels = element;
          console.log('eafad', element);
        }
      });
      this.repairTypeLabels.forEach((element) => {
        if (element.language == this.language) {
          this.currentRepairTypeLabels = element;
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
    if (!this.loggedIn) {
      alert('wrong id');
    }
  }

  setShowRepairDetails(set: boolean) {
    this.showRepairDetails = set;
    console.log('showrepair', this.showRepairDetails);
  }

  setShowConfirmation(set: boolean) {
    this.showConfirmation = set;
  }

  setShowAppointmentDetails(set: boolean) {
    this.showAppointmentDetails = set;
  }

  showAppointments(date: string) {
    if (this.arrayService.isEmpty(this.appointments)) {
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

  changeLanguage(language: string) {
    this.doctorLabels.forEach((element) => {
      if (element.language == language) {
        this.chosenLabels = element;
        console.log(element);
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

  findRepair() {
    this.repairs.forEach((element) => {
      if (element.repairId == this.repairGroup.value.reportId) {
        this.currentRepair = element;
        this.repairGroup.value.reportStatus = element.status;
        this.repairGroup.value.reportPhone = element.phone;
        this.repairGroup.value.reportDesc = element.desc;
        this.repairGroup.value.reportDate = element.date;
        console.log('statuso', element.status);
      }
    });
  }

  changeRepairStatus() {
    if (!this.repairGroup.value.reportStatus) {
      return;
    }
    this.currentRepair.status = this.repairGroup.value.reportStatus;
    this.repairService.updateRepairs(this.currentRepair);
  }
}
