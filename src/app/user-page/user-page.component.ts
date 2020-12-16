import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import { UserService } from '../services/user.service';
import {Role} from '../model/role.enum';
import { User } from '../model/user.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  private params;
  private user : User;
  private isAdmin = false;
  private mySrc;
  constructor(private route : ActivatedRoute,private userService : UserService,private router:Router,
    private sanitizer:DomSanitizer) {
    this.route.params.subscribe( routeParam => this.params = routeParam );

  }

  ngOnInit() {

    this.userService.getUserById(this.params.id).subscribe((userData : User)=>{
        this.user = userData;
        if(Role[this.user.role.toString()] == Role.Admin) this.isAdmin = true;
        if(userData.imageBlob != undefined){
          let base64data = userData.imageBlob;
          this.mySrc = this.sanitizer.bypassSecurityTrustUrl('data:'+userData.fileType+';base64,' + base64data);
        }
    });

  }

  logOut(){
    localStorage.removeItem('id');
    this.router.navigate(['/Welcome']);
  }

  play(){
    this.router.navigate(['/Question']);
  }
  manage(){
    this.router.navigate(['/Manage']);
  }
  update(){
    this.router.navigate(['/UpdateProfile']);
  }

}
