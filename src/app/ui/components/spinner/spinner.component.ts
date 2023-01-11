import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  spinnerActive:boolean = true;
  constructor(public spinnerService:SpinnerService) { 
    this.spinnerService.showSpinner.subscribe(this.showSpinner.bind(this));
  }

  showSpinner = (state:boolean):void => {
    this.spinnerActive = state
  }

}
