import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-badanie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './badanie.component.html',
  styleUrl: './badanie.component.scss',
})
export class BadanieComponent {
  protected distance = 5;
  protected type = 1;
  protected rowsCount = 11;

  protected rows: any = [];

  getRandom(min: any, max: any) {
    return Math.round(Math.random() * (max - min) + min);
  }

  getRandomLetter() {
    const randomCharCode = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
    return String.fromCharCode(randomCharCode);
  }

  ngOnInit() {
    this.generateTable();
  }

  protected lapacze = ['⊔', '⊓', '⊐', '⊏'];

  generateTable() {
    this.rows = [];
    for (let i = 0; i < this.rowsCount; i++) {
      this.rows[i] = '';
      for (let j = 0; j < i + 1; j++) {
        switch (this.type) {
          case 0:
            this.rows[i] += ' ' + this.getRandom(0, 9);
            break;
          case 1:
            this.rows[i] += ' ' + this.getRandomLetter();
            break;
          case 2:
            this.rows[i] += ' ' + this.lapacze[this.getRandom(0, 3)];
            break;
          default:
            this.rows[i] += ' ' + this.getRandom(0, 9);
        }
      }
    }
    console.log(this.rows);
  }

  protected rangeValue = 0.3;
  protected highlightColor = 'green';

  setRangeValue(rangeValue: any) {
    console.log(this.rangeValue);
    this.rangeValue = rangeValue;
  }

  setType(type: any) {
    this.type = type;
    this.generateTable();
  }

  getRangeValue() {
    return this.rangeValue;
  }

  setHighlightColor(color: string) {
    switch (color) {
      case 'yellow':
        this.highlightColor = 'yellow';
        break;
      case 'red':
        this.highlightColor = 'red';
        break;
      case 'green':
        this.highlightColor = 'green';
        break;
      case 'blue':
        this.highlightColor = 'blue';
        break;
      case 'black':
        this.highlightColor = 'black';
        break;
      default:
        this.highlightColor = 'yellow';
        break;
    }
  }

  setRowsCount(count: any) {
    if (count < 2 || count > 20) {
      return;
    }
    this.rowsCount = count;
    this.generateTable();
  }

  getType() {
    return this.type;
  }
}
