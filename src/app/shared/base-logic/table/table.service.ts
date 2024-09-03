import { Injectable } from '@angular/core';
import { ITable } from '../../interfaces/i-table';
import { IOperation } from '../../interfaces/i-operation';
import { IColumn } from '../../interfaces/i-column';
import { IPagedResponse } from '../../interfaces/i-paged-response';
import { formatDate } from '@angular/common';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TableService<T> implements ITable<T> {

  apiService: ApiService<any> | null = null;

  data: IPagedResponse<any> = {} as IPagedResponse<any>;

  operations: IOperation[] = [];

  groupOperations: IOperation[] = [];

  columns: IColumn[] = [];

  dateActionColumns: IColumn[] = [
    {
      id: "created_at",
      title: "Created at",
      template: (item: any) => {
        return formatDate(item.updated_at, "d MMM YYYY h:mm a", 'en');
      }
    },
    {
      id: "updated_at",
      title: "Updated at",
      template: (item: any) => {
        return formatDate(item.updated_at, "d MMM YYYY h:mm a", 'en');
      }
    }
  ];
  
  selectedRowIds: string[] = [];
  
  refreshStorage(): void {
    if(this.apiService) {
      this.apiService.getAll<IPagedResponse<any>>([`page=${this.data.current_page}`]).subscribe({
        next: (response) => {
          this.data = response.data;
        }
      });
    }
  }
}
