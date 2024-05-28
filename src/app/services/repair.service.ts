import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepairInterface } from '../interfaces/repair.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/repairs';

  private repairSource = new BehaviorSubject<RepairInterface>(
    {} as RepairInterface
  );
  currentDoctor = this.repairSource.asObservable();

  changeDoctor(doctor: RepairInterface) {
    this.repairSource.next(doctor);
  }

  getRepairs(): Observable<RepairInterface[]> {
    return this.http.get<RepairInterface[]>(this.url);
  }

  updateRepairs(repair: RepairInterface) {
    this.http.put(this.url + '/' + repair.id, repair).subscribe();
  }

  addRepair(repair: RepairInterface)
  {
    this.http.post(this.url,repair).subscribe()
  }
}
