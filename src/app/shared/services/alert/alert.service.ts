import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  public showDefaultMessage(msg: string = "", action: string = ""): void {
    this.snackbar.open(msg, action, {
      panelClass: "custom-snackbar",
      duration: 3000
    });
  }

  public showErrorMessage(msg: string = "", action: string = ""): void {
    this.snackbar.open(msg, action, {
      panelClass: ["custom-snackbar","custom-error-snackbar"],
      duration: 3000
    });
  }
}
