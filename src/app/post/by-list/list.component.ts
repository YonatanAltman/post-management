import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppService } from '../../app.service';
const SEC = 1000;
@Component({
  selector: 'post-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject();
  private timer$ = new ReplaySubject(1);
  private _list$ = new ReplaySubject<any[]>(1);
  private intervalSubscribstion;
  private intervalSubscribstionTimer;
  title = {
    title: 'posts',
    refresh: 'Refres in '
  };
  timer: number;
  public get list$(): Observable<any> {
    return this._list$.asObservable();
  }

  constructor(private app: AppService) {}

  ngOnInit() {
    this.getData();

    this.setTimerSeconds(60);
  }

  getAllPost() {
    const url = 'posts';
    return this.app.get(url);
  }
  getAllUsers() {
    const url = 'users';
    console.log('users');
    return this.app.get(url);
  }

  getData() {
    combineLatest(this.getAllUsers(), this.getAllPost())
      .pipe(
        (takeUntil(this.onDestroy$), 
        map(([users, posts]) => {
          users.map(u => {
            u.posts = posts.filter(p => p.userId === u.id);
          });
          console.log(users);
          this._list$.next(users);
        }))
      )
      .subscribe();
  }
  setTimerSeconds(interval: number) {
    this.timer$.next();
    this.timer = interval;
    this.intervalSubscribstion = setInterval(() => {
      console.log('refresh');
      this.getData();
    }, interval * SEC);
    this.intervalSubscribstionTimer = setInterval(() => {
      this.timer = this.timer > 0 ? this.timer - 1 : interval;
    }, SEC); 
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    clearInterval(this.intervalSubscribstion);
    clearInterval(this.intervalSubscribstionTimer);
  }
}
