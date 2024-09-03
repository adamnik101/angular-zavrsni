import { Injectable } from '@angular/core';
import { TableService } from '../../../../../shared/base-logic/table/table.service';
import { IArtist } from '../../../../../core/interfaces/artist/i-artist';
import { IColumn } from '../../../../../shared/interfaces/i-column';

@Injectable({
  providedIn: 'root'
})
export class AdminArtistsTableService extends TableService<IArtist[]>{

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
      id: "verified",
      title: "Verified",
      template: (artist: IArtist) => {
        return artist.verified ? "Yes" : "No";
      }
    },
    ...this.dateActionColumns
  ]
}
