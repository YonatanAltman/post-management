import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserAnimationsModule, CommonModule, BrowserModule, FormsModule, MaterialModule, HttpClientModule, PostModule, RouterModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [AppService],

})
export class AppModule { }
