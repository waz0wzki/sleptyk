import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DoctorInterface } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  marek: DoctorInterface = {
    doctorId: 'a',
    doctorName: 'marek',
    doctorSurname: 'komandos',
  };

  private doctorSource = new BehaviorSubject<DoctorInterface>(this.marek);
  currentDoctor = this.doctorSource.asObservable();

  changeDoctor(doctor: DoctorInterface) {
    this.doctorSource.next(doctor);
  }
}
