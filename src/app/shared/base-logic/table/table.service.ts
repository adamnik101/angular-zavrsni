import { Injectable } from '@angular/core';
import { ITable } from '../../interfaces/i-table';
import { IOperation } from '../../interfaces/i-operation';
import { IColumn } from '../../interfaces/i-column';

@Injectable({
  providedIn: 'root'
})
export class TableService<T> implements ITable<T> {

  data: any[] = [];

  operations: IOperation[] = [];

  columns: IColumn[] = [];
  
  addDefaultOperation(): void {
    this.operations = [
      {
        title: "Edit",
        method: (row: any) => {
          console.log(row)
        }
      },
      {
        title: "Delete",
        method: (row: any) => {
          console.log(row);
        }
      }
    ];
  }
}
