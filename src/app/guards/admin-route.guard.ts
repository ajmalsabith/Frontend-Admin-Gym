import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from 'app/service/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.tokenService.getAdminToken();
    const isAuthRoute = route.data['auth'] === true; // true means this route needs login

    if (isAuthRoute) {
      // Protected route → must have token
      if (token) {
        return true;
      } else {
        this.router.navigate(['/admin-login']);
        return false;
      }
    } else {
      // Guest route → must NOT have token
      if (token) {
        this.router.navigate(['admin/dashboard']);
        return false;
      }
      return true;
    }
  }
}
