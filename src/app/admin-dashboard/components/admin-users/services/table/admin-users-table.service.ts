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
      id: "select",
      title: "Select"
    },
    {
      id: "username",
      title: "Username"
    },
    {
      id: "email",
      title: "Email"
    },
    {
      id: "role",
      title: "Role",
      template: (user: IUser) => {
        return user.role.name;
      }
    }
  ];
}
