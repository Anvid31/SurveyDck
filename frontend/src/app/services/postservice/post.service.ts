import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { evironment } from '../../../environment/environment';

export interface Survey {
  title: string;
  description: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = evironment.URL;

  constructor(private http: HttpClient) {}

  getSurvey(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(`${this.apiUrl}create`, survey);
  }
}
