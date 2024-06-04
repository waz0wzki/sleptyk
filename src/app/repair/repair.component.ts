import { Component } from '@angular/core';
import { REPAIR_LABELS } from '../models/repair.labels';
import { LanguageService } from '../services/language.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RepairInterface } from '../interfaces/repair.interface';
import { RepairService } from '../services/repair.service';
import { REPAIR_STATUS_LABELS } from '../models/repairStatus.labels';

@Component({
  selector: 'app-repair',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './repair.component.html',
  styleUrl: './repair.component.scss',
})
export class RepairComponent {
  protected repairLabels = REPAIR_LABELS;
  protected chosenLabels = {} as any;
  protected language = 'french';
  protected currentRepair = {} as RepairInterface;
  protected repairs = [] as RepairInterface[];
  protected repairStatusLabels = REPAIR_STATUS_LABELS;
  protected currentRepairStatusLabels = [] as any;
  protected date = new Date().toISOString().split('T')[0];

  constructor(
    private languageService: LanguageService,
    private repairService: RepairService
  ) {}

  ngOnInit() {
    this.languageService.currentLanguage.subscribe((lang) => {
      this.language = lang;
      this.repairLabels.forEach((element) => {
        if (element.language == this.language) {
          this.chosenLabels = element;
          console.log(element);
        }
      });
      this.repairStatusLabels.forEach((element) => {
        if (element.language == this.language) {
          this.currentRepairStatusLabels = element;
          console.log('eafad', element);
        }
      });
      // this.changeLanguage(this.language);
    });

    this.repairService.getRepairs().subscribe((reps) => {
      this.repairs = reps;
    });
  }

  protected repairGroup = new FormGroup({
    repairType: new FormControl(''),
    repairDesc: new FormControl(''),
    repairPhone: new FormControl(''),
  });

  protected statusGroup = new FormGroup({
    statusId: new FormControl(''),
    statusPhone: new FormControl(''),
  });

  // protected changeLanguage(language: string) {
  //   this.repairLabels.forEach((element) => {
  //     if (element.language == this.language) {
  //       this.chosenLabels = element;
  //       console.log(element);
  //     }
  //   });
  // }

  findRepair() {
    this.repairs.forEach((element) => {
      if (
        element.repairId == this.statusGroup.value.statusId &&
        element.phone == this.statusGroup.value.statusPhone
      ) {
        this.currentRepair = element;
      }
    });
  }

  protected submitRepair() {
    let newRepair = {} as RepairInterface;
    if (
      !this.repairGroup.value.repairPhone ||
      !this.repairGroup.value.repairDesc ||
      !this.repairGroup.value.repairType
    ) {
      return;
    }

    newRepair.date = this.date;
    newRepair.repairId = Math.floor(
      Math.random() * (9999 - 1000 + 1) + 1000
    ).toString();
    newRepair.phone = this.repairGroup.value.repairPhone;
    newRepair.type = this.repairGroup.value.repairType;
    newRepair.desc = this.repairGroup.value.repairDesc;
    newRepair.status = '0';
    console.log('newrep', newRepair);

    if (!confirm('are you sure')) {
      return;
    }
    this.repairService.addRepair(newRepair);

    this.repairService.getRepairs().subscribe((reps) => {
      this.repairs = reps;
    });
    alert('Id twojej naprawy to ' + newRepair.repairId);
    console.log(this.repairs, 'reparidos wojennocindos');
    window.location.reload();
  }

  protected submitStatus() {}
}
