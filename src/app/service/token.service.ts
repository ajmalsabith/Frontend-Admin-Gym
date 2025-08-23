import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) { }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

   SetAdminToken(token:string): void {
    localStorage.setItem('admin_token', token);
  }

  SetRole(role:string){
     localStorage.setItem('Role',role);
  }

  clearAdminToken(): void {
    localStorage.removeItem('admin_token');
  }

  
  getAdminToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  GetRole(){
      return localStorage.getItem('Role');
  }

  Clientlogout(): void {
    this.clearTokens();
    this.router.navigate(['/client-login']);
  }

  AdminLogout(){
    this.clearAdminToken();
    this.router.navigate(['/admin-login']);
  }


}
