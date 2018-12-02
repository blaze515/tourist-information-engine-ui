import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: 'app.dialog-modal.html',
})
export class AppDialogModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AppDialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
