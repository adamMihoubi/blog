import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';
import {Md5} from 'ts-md5/dist/md5';
import {Router} from "@angular/router"
import { isNull } from 'util';
import { timer } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  email;
  formdata;
  passwd;
  id;
  dateCreation;
  user : User;
  mpCorrect;
  error=false;
  constructor(private userService : UserService,private route : Router) { }

  ngOnInit() {
    this.mpCorrect = false;
      if(!isNull(localStorage.getItem('id'))) {
        var id = JSON.parse(localStorage.getItem('id')).id;
        this.route.navigate(['/User',id]);
      }
      if(!isNull(localStorage.getItem('error'))){
          this.error = true;
          const t = timer(5000);
          t.subscribe(v=>{
            this.error = false;
            localStorage.removeItem('error');
          });
      }
      this.formdata = new FormGroup({
         email: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("[^ @]+@[^ @]+\\.[^ @]+")
         ])),
         passwd: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
         ]))
      });
  }
  onClickSubmit(data) {
    this.email = data.email;
    this.passwd = data.passwd;
    this.userService.getUser(this.email).subscribe((userData : User)=>{
      if(!isNull(userData)){
        this.user = userData;
        this.passwd = Md5.hashStr(this.passwd);
        if(this.passwd == this.user.password){
          this.mpCorrect = false;
          console.log("Connection OK");
          localStorage.setItem('id', JSON.stringify({id : this.user.id}));
          localStorage.setItem('q',JSON.stringify({q : this.user.questions}));
          this.route.navigate(['/User', this.user.id]);
        }else{
          this.mpCorrect = true;
        }
      }else{
        this.mpCorrect = true;
      }


    });




  }

}
