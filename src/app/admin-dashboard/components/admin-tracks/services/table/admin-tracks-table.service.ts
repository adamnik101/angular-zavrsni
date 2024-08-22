import { Injectable } from '@angular/core';
import { TableService } from '../../../../../shared/base-logic/table/table.service';
import { ITrack } from '../../../../../core/interfaces/tracks/i-track';

@Injectable({
  providedIn: 'root'
})
export class AdminTracksTableService extends TableService<ITrack[]>{

}
