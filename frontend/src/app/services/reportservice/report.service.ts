import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { evironment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private urlApi = evironment.URL; // URL base del backend

  constructor(private http: HttpClient) {}

  public getReport(startDate: string, endDate: string): Observable<any> {
    // Construir la URL con las fechas en formato ISO
    const fullUrl = `${this.urlApi}/report?startDate=${startDate}&endDate=${endDate}`;
    console.log('Solicitando reporte con URL:', fullUrl); // Debugging
    return this.http.get<any>(fullUrl);
  }
}
