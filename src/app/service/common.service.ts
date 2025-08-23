import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisConfig } from 'app/Apis/apis.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 constructor(private http: HttpClient,private apiConfig:ApisConfig) {}

  private apiKey = 'GYM_SOFT_43'; // or load from environment

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    });
  }


getIndianCitiesList(): Observable<any> {
    return this.http.get(
      `${this.apiConfig.API_LOCAL_URL}${this.apiConfig.GET_INDIAN_CITIES_LIST}`,
      { headers: this.getHeaders() }
    );
  }

  getIndianStatesDistList(): Observable<any> {
    return this.http.get(
      `${this.apiConfig.API_LOCAL_URL}${this.apiConfig.GET_INDIAN_STATES_DIST_LIST}`,
      { headers: this.getHeaders() }
    );
  }
}
