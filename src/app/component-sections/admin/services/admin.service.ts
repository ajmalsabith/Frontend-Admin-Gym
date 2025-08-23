import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisConfig } from 'app/Apis/apis.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

 constructor(private http: HttpClient,private apiConfig:ApisConfig) {}

  private apiKey = 'GYM_SOFT_43'; // or load from environment

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    });
  }


  createGym(data: any): Observable<any> {
    return this.http.post(
      `${this.apiConfig.API_LOCAL_URL}${this.apiConfig.CREATE_GYM}`,
      data,
      { headers: this.getHeaders() }
    );
  }

  updateGym(data: any): Observable<any> {
    return this.http.post(
      `${this.apiConfig.API_LOCAL_URL}${this.apiConfig.UPDATE_GYM}`,
      data,
      { headers: this.getHeaders() }
    );
  }

  getGymList(): Observable<any> {
    return this.http.get(
      `${this.apiConfig.API_LOCAL_URL}${this.apiConfig.GET_GYM_LIST}`,
      { headers: this.getHeaders() }
    );
  }



    createUser(data: any): Observable<any> {
    return this.http.post(
      `${this.apiConfig.API_LOCAL_URL}${this.apiConfig.CREATE_USER}`,
      data,
      { headers: this.getHeaders() }
    );
  }

  updateUser(data: any): Observable<any> {
    return this.http.post(
      `${this.apiConfig.API_LOCAL_URL}${this.apiConfig.UPDATE_USER}`,
      data,
      { headers: this.getHeaders() }
    );
  }

  getUserList(): Observable<any> {
    return this.http.get(
      `${this.apiConfig.API_LOCAL_URL}${this.apiConfig.GET_USER_LIST}`,
      { headers: this.getHeaders() }
    );
  }


    AdminLogin(data: any): Observable<any> {
    return this.http.post(
      `${this.apiConfig.API_LOCAL_URL}${this.apiConfig.ADMIN_LOGIN}`,
      data,
      { headers: this.getHeaders() }
    );
  }
}
