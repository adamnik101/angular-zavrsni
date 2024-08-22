import { Injectable } from '@angular/core';
import { TableService } from '../../../../../shared/base-logic/table/table.service';
import { IUser } from '../../../../../core/interfaces/user/i-user';
import { IColumn } from '../../../../../shared/interfaces/i-column';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersTableService extends TableService<IUser[]>{


  override columns: IColumn[] = [
    {
      id: "username",
      title: "Username"
    }
  ];
}
