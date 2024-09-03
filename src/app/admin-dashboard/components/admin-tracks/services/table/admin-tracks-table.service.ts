import { Injectable } from '@angular/core';
import { TableService } from '../../../../../shared/base-logic/table/table.service';
import { ITrack } from '../../../../../core/interfaces/tracks/i-track';
import { IColumn } from '../../../../../shared/interfaces/i-column';
import { IAlbum } from '../../../../../core/interfaces/album/i-album';
import { IOperation } from '../../../../../shared/interfaces/i-operation';

@Injectable({
  providedIn: 'root'
})
export class AdminTracksTableService extends TableService<ITrack[]>{

  override columns: IColumn[] = [
    {
      id: "select",
      title: "Select"
    },
    {
      id: "title",
      title: "Title"
    },
    {
      id: "album",
      title: "Album",
      template: (track: ITrack) => {
        if(track.album) {
          return track.album.name;
        }
        return '/';
      }
    },
    {
      id: "explicit",
      title: "Explicit",
      template: (track: ITrack) => {
        return track.explicit ? "Yes" : "No"
      }
    },
    {
      id: "track_plays_count",
      title: "Plays"
    },
    ...this.dateActionColumns
  ];
}
