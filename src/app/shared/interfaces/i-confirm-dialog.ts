import { ConfirmDialogActions } from "../components/confirm-dialog-with-actions/enums/confirm-dialog-actions";

export interface IDialogActionsButton {

}

export interface IConfirmDialog {
    header: string;
    message: string;
    actions: ConfirmDialogActions[];
    customClass: string;
}
