import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './by-list/list.component';
import { ByDialogComponent, PostDialogComponent } from './by-dialog/by-dialog.component';
import { MaterialModule } from '../../material/material.module';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule
  ],
  declarations: [ListComponent, ByDialogComponent, PostDialogComponent],
  exports: [ListComponent, ByDialogComponent],
  entryComponents: [PostDialogComponent]
})
export class PostModule { }