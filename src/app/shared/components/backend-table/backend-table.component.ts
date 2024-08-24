import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../base-logic/api/api.service';
import { TableService } from '../../base-logic/table/table.service';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { IPagedResponse } from '../../interfaces/i-paged-response';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { SpinnerFunctions } from '../../../core/static/spinner-functions';

@Component({
  selector: 'app-backend-table',
  standalone: true,
  imports: [MatSelect, MatFormField, MatLabel, MatOption, NgClass, MatButton, MatIcon],
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


  goToPage(url: string | null): void {
    if(url) {
      this.http.get<IPagedResponse<any>>(url).subscribe({
        next: (response) => {
          this.tableService.data = response.data;
        }
      })
    }
  }
}
