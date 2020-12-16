import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { isNull } from 'util';
import {UserService} from '../services/user.service';
import {Role} from '../model/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor (private route: Router , private userService : UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!isNull(localStorage.getItem('id'))){
        var id = JSON.parse(localStorage.getItem('id')).id
        return this.isAdmin(id);
      }

    }

    private isAdmin(id):Observable<boolean>{
      var subject = new Subject<boolean>();
      this.userService.getUserRole(id).subscribe((r:String) => {
        if(r == Role[Role.Admin]) subject.next(true);
        else {
          subject.next(false);
          this.route.navigate(['/Welcome']);
        }
      },
      err=>{
        console.log(err);
        subject.next(false);

      });
      return subject.asObservable();

    }
  }
