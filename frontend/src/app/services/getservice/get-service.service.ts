import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { evironment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GetServiceService {
  private urlApi = evironment.URL
  constructor(private http: HttpClient) {}
  public getData() : Observable<any>{
    return this.http.get<any>(this.urlApi)
  }

}
