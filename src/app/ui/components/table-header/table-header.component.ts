import { Component,Input,Output,EventEmitter } from '@angular/core';
import { BasePageableModel } from 'src/app/models/base-response/base-pageable-model';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  @Input() buttonName : string;
  @Input() rowCountSelectable = true;
  @Input() rowCounts : number[] = [5,10,15]
  @Input() model : BasePageableModel<any>
  @Output() selectedRowCountChange = new EventEmitter<number>();
  @Output() createButtonClick : EventEmitter<any> = new EventEmitter();
  selectedRowCount:number = 5

  constructor(){}

}
