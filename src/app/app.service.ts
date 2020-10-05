import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
const API = environment.api
@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.http.get(API+url);
  }
}
