import { Component,EventEmitter,Input,OnInit,Output } from '@angular/core';
import { ListResponseModel } from 'src/app/models/base-response/list-response.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{
  /**
   * Pagination uygulanacak data ListResponseModel içerisinde gönderilmelidir.
   */
  @Input() dataToPaginate: ListResponseModel<any>
  @Input() currentPage:number = 0
  @Input() position : 'left' | 'right' | 'middle' = 'middle'
  @Output() onPageChange: EventEmitter<number> = new EventEmitter()
  ngOnInit(): void {
    
  }
  
}
