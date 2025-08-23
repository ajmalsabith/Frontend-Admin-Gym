import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGymPopupComponent } from './add-gym-popup/add-gym-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddUserPopupComponent } from './add-user-popup/add-user-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddGymPopupComponent,
    AddUserPopupComponent
  ],
  imports: [
    CommonModule,
    // MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
     MatCardModule,
     MatDialogModule,
     MatFormFieldModule
  ]
})
export class SharedPopupsModule { }
