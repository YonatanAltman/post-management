import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './by-list/list.component';
import { ByDialogComponent, PostDialogComponent } from './by-dialog/by-dialog.component';
import { MaterialModule } from '../../material/material.module';
import { PostRoutingModule } from './post-routing.module';
import { PostErrorComponent } from './post-error/post-error.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor, HTTP_ERROR_INSPECTORE_CONFIG, IHttpErrorInspectoreConfig } from '@ya/common';
import { TopComponent } from './top/top.component';
const config: IHttpErrorInspectoreConfig = {
  moduleName: 'posts',
  retryCount: 1
};
@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule
  ],
  declarations: [ListComponent, ByDialogComponent, PostDialogComponent, PostErrorComponent, TopComponent],
  exports: [ListComponent, ByDialogComponent],
  entryComponents: [PostDialogComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },
  { provide: HTTP_ERROR_INSPECTORE_CONFIG, useValue: config }]
})
export class PostModule { }
