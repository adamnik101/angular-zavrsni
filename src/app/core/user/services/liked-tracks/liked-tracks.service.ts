import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../config/api-endpoints';
import { ITrack } from '../../../interfaces/tracks/i-track';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../../../../shared/interfaces/i-api-response';
import { TracksTableService } from '../../../services/tracks/table/tracks-table.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { QueueService } from '../../../services/queue/base/queue.service';

@Injectable({
  providedIn: 'root'
})
export class LikedTracksService extends ApiService<any>{

  constructor(
    http: HttpClient,
    private tracksTableService: TracksTableService,
    private alertService: AlertService,
    private queueService: QueueService
  ) { 
    super(API_ENDPOINTS.user.tracks, http);
  }

  public likedTracks = signal<ITrack[]>([]);

  setLikedTracks(tracks: ITrack[]): void {
    this.likedTracks.set(tracks.map(track => { return {...track, liked: true}}));
  }

  addToLiked(id: string): Observable<IApiResponse<any>> {
    return this.post({uuid: id}).pipe(tap({
      next: (response: any) => {
        if(response.status_code === 200) {
          this.likedTracks.update(tracks => {
            return [{...response.data, liked: true}].concat(tracks);
          });
          
          this.tracksTableService.tracks.update(tracks => {
            let track = tracks.find(x => x.id === id);

            if(track) {
              track.liked = true;
            }

            return tracks;
          })

          if(this.queueService.getQueue().length) {
            this.queueService._queue.update(queue => {
              let track = queue.find(track => track.id === id);
  
              if(track) {
                track.liked = true;
              }
  
              return queue;
            })
          }
        }
        this.alertService.showDefaultMessage(response.message);
      },
      error: (err) => {
        this.alertService.showErrorMessage(err.message);
      }
    }));
  }

  removeFromLiked(id: string): Observable<IApiResponse<any>> {
    return this.delete(id).pipe(tap({
      next: (data) => {
        this.likedTracks.set(this.likedTracks().filter(track => track.id != id));
        
        this.tracksTableService.tracks.update(tracks => {
          let track = tracks.find(x => x.id === id);

          if(track) {
            track.liked = false;
          }

          return tracks;
        });

        if(this.queueService.getQueue().length) {
          this.queueService._queue.update(queue => {
            let track = queue.find(track => track.id === id);

            if(track) {
              track.liked = false;
            }

            return queue;
          })
        }

        this.alertService.showDefaultMessage("Removed from liked.");
      },
      error: (err) => {
        this.alertService.showErrorMessage(err.message);
      }
    }));
  }
}
