import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Menu } from '@core';
import { Token, User } from './interface';
import { TokenService } from 'app/service/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http:HttpClient,private tokenservice:TokenService){

  }

  login(username: string, password: string, rememberMe = false) {
    return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    return this.http.get<User>('/me');
  }

menu() {
    return this.http.get<{ menu: Menu[] }>('data/menu.json').pipe(map(res => res.menu));
}

clientmenu() {
  return this.http.get<{ menu: Menu[] }>('data/clientmenu.json').pipe(map(res => res.menu));
}

}
