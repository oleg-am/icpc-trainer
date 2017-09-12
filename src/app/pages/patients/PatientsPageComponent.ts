import {Component} from '@angular/core';
import {PatientsService} from '../../services/PatientsService';

@Component({
  selector: 'icpc-patients',
  templateUrl: 'patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsPageComponent {

  constructor(private patientsService: PatientsService) {
    patientsService.loadItems();
  }

  public get patients() {
    this.patientsService.patients.subscribe(f => {
      console.log(f);
    })
    return this.patientsService.patients;
  }
}
