import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DoctorInterface } from '../interfaces/doctor.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/doctors';

  // marek: DoctorInterface = {
  //   id
  //   doctorId: 'a',
  //   doctorName: 'marek',
  //   doctorSurname: 'komandos',
  // };

  private doctorSource = new BehaviorSubject<DoctorInterface>(
    {} as DoctorInterface
  );
  currentDoctor = this.doctorSource.asObservable();

  changeDoctor(doctor: DoctorInterface) {
    this.doctorSource.next(doctor);
  }

  getDoctors(): Observable<DoctorInterface[]> {
    return this.http.get<DoctorInterface[]>(this.url);
  }

  updateDoctors(doctor: DoctorInterface) {
    this.http.put(this.url + '/' + doctor.id, doctor).subscribe();
  }
}
