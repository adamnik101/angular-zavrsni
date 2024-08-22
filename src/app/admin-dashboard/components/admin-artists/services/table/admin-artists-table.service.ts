import { Injectable } from '@angular/core';
import { TableService } from '../../../../../shared/base-logic/table/table.service';
import { IArtist } from '../../../../../core/interfaces/artist/i-artist';

@Injectable({
  providedIn: 'root'
})
export class AdminArtistsTableService extends TableService<IArtist[]>{

}
