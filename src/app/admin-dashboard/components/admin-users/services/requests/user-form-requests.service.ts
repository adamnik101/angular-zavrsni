import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { UserService } from '../../../../../core/user/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { AdminUsersService } from '../api/admin-users.service';
import { RolesService } from '../api/roles.service';

@Injectable({
  providedIn: 'root'
})
export class UserFormRequestsService {

  constructor(
    private http: HttpClient,
    private userService: AdminUsersService,
    private rolesService: RolesService
  ) { }

  getDataFromRequestsById(id: string | null = null): Observable<any> {
    let requests: {
      roles: any;
      user?: any
    } = {
      roles: this.getRoles()
    };

    if(id !== null) {
      requests['user'] = this.getUserById(id); 
    }

    return forkJoin(requests);
  }

  getUserById(id: string): Observable<any> {
    return this.userService.get(id);
  }

  getRoles(): Observable<any> {
    return this.rolesService.getAll();
  }

  submitInsert(dataToSend: any): Observable<any> {
    return this.userService.post(dataToSend);
  }

  submitUpdate(id: any, dataToSend: any): Observable<any> {
    return this.userService.patch(id, dataToSend);
  }
}
