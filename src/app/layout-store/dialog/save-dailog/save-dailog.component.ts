import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-dailog',
  templateUrl: './save-dailog.component.html',
  styleUrl: './save-dailog.component.scss'
})
export class SaveDailogComponent {

   constructor(
    public dialogRef: MatDialogRef<SaveDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { icon?: string; message: string }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
