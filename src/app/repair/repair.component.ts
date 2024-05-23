import { Component } from '@angular/core';
import { REPAIR_LABELS } from '../models/repair.labels';
import { LanguageService } from '../services/language.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLanguage.subscribe((lang) => {
      this.language = lang;
      this.repairLabels.forEach((element) => {
        if (element.language == this.language) {
          this.chosenLabels = element;
          console.log(element);
        }
      });
      // this.changeLanguage(this.language);
    });
  }

  protected repairGroup = new FormGroup({
    repairType: new FormControl(''),
    repairDesc: new FormControl(''),
  });

  protected statusGroup = new FormGroup({
    statusId: new FormControl(''),
    statusPhone: new FormControl(''),
  });

  protected changeLanguage(language: string) {
    this.repairLabels.forEach((element) => {
      if (element.language == this.language) {
        this.chosenLabels = element;
        console.log(element);
      }
    });
  }

  protected submitRepair() {
    console.log('reparcje wojenne', this.repairGroup.value);
  }

  protected submitStatus() {
    console.log('sekcja zwlok', this.statusGroup.value);
  }
}
