import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { DoctorInterface } from '../interfaces/doctor.interface';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss',
})
export class DoctorComponent {
  protected currentDoctor = {} as DoctorInterface;

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.currentDoctor.subscribe((doctor) => {
      this.currentDoctor = doctor;
      console.log('marek', this.currentDoctor);
    });
  }
}
