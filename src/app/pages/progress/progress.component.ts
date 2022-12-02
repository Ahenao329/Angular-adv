import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso1: number = 15;
  progreso2: number = 25;
  
  get getPorogreso1() {
    return `${this.progreso1}%`;
  }

  get getPorogreso2() {
    return `${this.progreso2}%`;
  }

}
