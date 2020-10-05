import { NgModule } from '@angular/core';
import { MatDialogModule, MatButtonModule } from '@angular/material';
const EXPORT = [MatDialogModule, MatButtonModule];

@NgModule({
  imports: EXPORT,
  exports: EXPORT
})
export class MaterialModule { }
