import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { isNull } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
  private route: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = !isNull(localStorage.getItem('id'));

    if (!isLoggedIn) {
      localStorage.setItem('error','err');
      this.route.navigate(['/Welcome']);
    }
    return isLoggedIn;
  }
}
