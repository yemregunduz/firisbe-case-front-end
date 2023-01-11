import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-data-not-found',
  template:"<div class='alert alert-danger text-center mb-0' role='alert'>{{text ?? 'Kriterlere uygun veri bulunamadı.'}}</div>",
})
export class DataNotFoundComponent {
  @Input() text = "Veri bulunamadı.";
}
