import { Injectable } from '@angular/core';
import { TableService } from '../../../../../shared/base-logic/table/table.service';
import { IAlbum } from '../../../../../core/interfaces/album/i-album';

@Injectable({
  providedIn: 'root'
})
export class AdminAlbumsTableService extends TableService<IAlbum[]>{

}
