import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-post-error',
  templateUrl: './post-error.component.html',
  styleUrls: ['./post-error.component.scss']
})
export class PostErrorComponent implements OnInit {
  title = {
    title: 'Error'
  };
  constructor(private app: AppService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.app.get('yonatan').subscribe();
  }

}
