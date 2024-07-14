import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../shared/base-logic/api/api.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ISearchResult } from '../../interfaces/i-search-result';
import { IApiResponse } from '../../../shared/interfaces/i-api-response';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends ApiService<IApiResponse<ISearchResult>>{

  constructor(
    http: HttpClient
  ) {
    super(API_ENDPOINTS.search.api, http);
  }

  public query: BehaviorSubject<string> = new BehaviorSubject("");
  
  public results = signal<ISearchResult | null>(null);

}