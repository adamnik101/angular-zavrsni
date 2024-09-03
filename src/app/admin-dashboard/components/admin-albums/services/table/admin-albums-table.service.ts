import { Injectable } from '@angular/core';
import { TableService } from '../../../../../shared/base-logic/table/table.service';
import { IAlbum } from '../../../../../core/interfaces/album/i-album';
import { IColumn } from '../../../../../shared/interfaces/i-column';

@Injectable({
  providedIn: 'root'
})
export class AdminAlbumsTableService extends TableService<IAlbum[]>{

  override columns: IColumn[] = [
    {
      id: "select",
      title: "Select"
    },
    {
      id: "name",
      title: "Name"
    },
    {
      id: "release_year",
      title: "Release year"
    },
    {
      id: "tracks_count",
      title: "No. of Tracks"
    },
    ...this.dateActionColumns
  ];
}
