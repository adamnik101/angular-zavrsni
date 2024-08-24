import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../base-logic/api/api.service';
import { TableService } from '../../base-logic/table/table.service';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { IPagedResponse } from '../../interfaces/i-paged-response';
import { NgClass } from '@angular/common';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { SpinnerFunctions } from '../../../core/static/spinner-functions';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-backend-table',
  standalone: true,
  imports: [MatSelect, MatFormField, MatLabel, MatOption, NgClass,MatFabButton, MatButton, MatIcon, MatCheckbox, MatBadge],
  templateUrl: './backend-table.component.html',
  styleUrl: './backend-table.component.scss'
})
export class BackendTableComponent implements OnInit{

  constructor(
    private http: HttpClient
  ) {}

  @Input() public apiService: ApiService<any> = {} as ApiService<any>;
  @Input() public tableService: TableService<any> = {} as TableService<any>;

  ngOnInit(): void {
    SpinnerFunctions.showSpinner();
    this.tableService.data = {} as IPagedResponse<any>;
    
    this.apiService.getAll<IPagedResponse<any>>().subscribe({
      next: (response) => {
        this.tableService.data = response.data;
        SpinnerFunctions.hideSpinner();
      }
    })
  }

  toggleCheckboxAll(): void {
    if(this.tableService.selectedRowIds.length < this.tableService.data.data.length) {
      this.tableService.selectedRowIds = this.tableService.data.data.map((x: any) => x.id);
    } else {
      this.tableService.selectedRowIds = [];
    }
  }

  toggleCheckbox(event: any, row: any): void {
    if(this.tableService.selectedRowIds.includes(row.id)) {
      const indexToDelete = this.tableService.selectedRowIds.findIndex(x => x === row.id);
      
      if(indexToDelete !== -1) {
        this.tableService.selectedRowIds.splice(indexToDelete, 1);
      }

      return;
    } 

    this.tableService.selectedRowIds.push(row.id)
  }

  goToPage(url: string | null): void {
    if(url) {
      this.http.get<IPagedResponse<any>>(url).subscribe({
        next: (response) => {
          this.tableService.data = response.data;
          this.tableService.selectedRowIds = [];
        }
      })
    }
  }
}
