import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../base-logic/api/api.service';
import { TableService } from '../../base-logic/table/table.service';

@Component({
  selector: 'app-backend-table',
  standalone: true,
  imports: [],
  templateUrl: './backend-table.component.html',
  styleUrl: './backend-table.component.scss'
})
export class BackendTableComponent implements OnInit{

  constructor(
  ) {}

  @Input() public apiService: ApiService<any> = {} as ApiService<any>;
  @Input() public tableService: TableService<any> = {} as TableService<any>;

  
  ngOnInit(): void {
    this.tableService.data = [];
    
    this.apiService.getAll<any>().subscribe({
      next: (response) => {
        this.tableService.data = response.data.data;
        console.log(response);
      }
    })
  }
}
