import { Injectable } from '@angular/core';
import { TableService } from '../../../../../shared/base-logic/table/table.service';
import { IGenre } from '../../../../../core/interfaces/genre/i-genre';

@Injectable({
  providedIn: 'root'
})
export class AdminGenresTableService extends TableService<IGenre[]> {

}
