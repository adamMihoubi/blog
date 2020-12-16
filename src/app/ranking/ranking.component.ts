import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  mySrc:Array<SafeResourceUrl>;
  private users:Array<User>;
  constructor(private sanitizer:DomSanitizer, private userService :  UserService ) { }

  ngOnInit() {
    this.mySrc = new Array<String>();
    this.userService.getUsersRanking().subscribe((users:Array<User>)=>{
      this.users = users;
      for(let u of this.users){
        var i = users.indexOf(u);
        this.mySrc[i] = this.sanitizer.bypassSecurityTrustUrl('data:'+u.fileType+';base64,' + u.imageBlob);
      }
    },err=>{
      console.log(err);
    })
  }
  private index(u:User){
    return this.users.indexOf(u);
  }
}
