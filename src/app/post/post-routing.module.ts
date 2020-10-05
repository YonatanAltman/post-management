import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByDialogComponent } from './by-dialog/by-dialog.component';
import { ListComponent } from './by-list/list.component';
import { PostErrorComponent } from './post-error/post-error.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },

  { path: 'list', component: ListComponent },
  { path: 'dialog', component: ByDialogComponent },
  { path: 'error', component: PostErrorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
