import { Component, Inject, OnDestroy,  OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { concat, Observable, Subject } from "rxjs";
import { concatMap, takeUntil } from "rxjs/operators";
import { AppService } from "../../app.service";
import { IPost } from "../post.model";

@Component({
  selector: "app-by-dialog",
  templateUrl: "./by-dialog.component.html",
  styleUrls: ["./by-dialog.component.scss"]
})
export class ByDialogComponent implements OnInit,OnDestroy {
  stop$ = new Subject();
  title = {
    title: "posts"
  };
  constructor(private app: AppService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllPost();
    console.log("res");
  }

  getAllPost() {
    const url = "posts";
    this.app.get(url).subscribe((posts: IPost[]) => {
 
      concat(posts)
        .pipe(
          concatMap(d => this.createDialog(d).pipe())
          )
        .pipe(
          
          takeUntil(this.stop$)
        ).subscribe(stop=>{
          if(stop){
            this.stop$.next();
          }
        });
        ;
    });
  }
  createDialog(data: IPost) {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: "350px",
      data
    });

    return dialogRef.afterClosed();
  }
    ngOnDestroy(): void {
    this.stop$.next();
  }
}

@Component({
  selector: "post-dialog",
  templateUrl: "./post-dialog.component.html",
  styleUrls: ["./by-dialog.component.scss"]
})
export class PostDialogComponent implements OnInit {
  btn = {
    next: "next",
    stop: "stop",
  };
  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPost
  ) {}

  ngOnInit() {}
  onClick(stop?:boolean) {
    this.dialogRef.close(stop);
  }
}
