import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DoctorInterface } from '../interfaces/doctor.interface';
import { HttpClient } from '@angular/common/http';
import { AppointmentInterface } from '../interfaces/appointment.interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/appointments';

  getAppointments(): Observable<AppointmentInterface[]> {
    return this.http.get<AppointmentInterface[]>(this.url);
  }

  updateAppointment(appointment: AppointmentInterface) {
    this.http.put(this.url + '/' + appointment.id, appointment).subscribe();
  }

  addAppointment(appointment: AppointmentInterface) {
    this.http.post(this.url, appointment).subscribe();
  }
}
