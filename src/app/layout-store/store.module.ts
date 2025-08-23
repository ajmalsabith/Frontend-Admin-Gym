import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';
import { SaveDailogComponent } from './dialog/save-dailog/save-dailog.component';
import { ErrorDailogComponent } from './dialog/error-dailog/error-dailog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    SaveDailogComponent,
    ErrorDailogComponent
  ],
  imports: [
    CommonModule,
      MatIconModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
      MatDialogModule,
  ]
})
export class StoreModule { }
