import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  complaintId?: string;
}
@Component({
  selector: 'app-dialog',
  standalone: false,
  
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  notes: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onYesClick(): void {
    this.dialogRef.close({
      resolved: true,
      notes: this.notes
    });
  }

}
