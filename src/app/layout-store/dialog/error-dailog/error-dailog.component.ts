import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-error-dailog',
  templateUrl: './error-dailog.component.html',
  styleUrl: './error-dailog.component.scss'
})
export class ErrorDailogComponent {

     constructor(
      public dialogRef: MatDialogRef<ErrorDailogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { icon?: string; message: string }
    ) {}
  
    closeDialog() {
      this.dialogRef.close();
    }
  

}
