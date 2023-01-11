import { Component } from '@angular/core';
import { CandidateInformation } from 'src/app/shared/constants/candidate-information.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  candidate = CandidateInformation.YunusEmreGunduz
}

