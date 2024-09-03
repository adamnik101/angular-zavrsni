import { Injectable } from '@angular/core';
import { TableService } from '../../../../../shared/base-logic/table/table.service';
import { IGenre } from '../../../../../core/interfaces/genre/i-genre';
import { IColumn } from '../../../../../shared/interfaces/i-column';

@Injectable({
  providedIn: 'root'
})
export class AdminGenresTableService extends TableService<IGenre[]> {

  override columns: IColumn[] = [
    {
      id: "select",
      title: "Select"
    },
    {
      id: "name",
      title: "Name"
    },
    ...this.dateActionColumns
  ]
}
