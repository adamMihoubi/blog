import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common'
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';
import {Role} from '../model/role.enum';
import {Md5} from 'ts-md5/dist/md5';
import {Router} from "@angular/router"
import { isNull } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[DatePipe]
})
export class RegisterComponent implements OnInit {
  formdata;
  mpCorrect = false;
  user:User;
  constructor(private userService : UserService,private route : Router,private datePipe: DatePipe) { }

  ngOnInit() {
    if(!isNull(localStorage.getItem('id'))) {
      var id = JSON.parse(localStorage.getItem('id')).id;
      this.route.navigate(['/User',id]);
    }
    this.formdata = new FormGroup({
       email: new FormControl("", Validators.compose([
          Validators.required,
          Validators.pattern("[^ @]+@[^ @]+\\.[^ @]+")
       ])),
       passwd: new FormControl("", Validators.compose([
          Validators.required,
          Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
       ])),
       passwd2: new FormControl("", Validators.compose([
          Validators.required,
          Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
       ])),
       lastName:new FormControl("", Validators.compose([
          Validators.required
        ])),
       firstName:new FormControl("",Validators.compose([
          Validators.required
        ]))
    });
  }

  get f(){
    return this.formdata.controls;
  }

  onRegister(formdata){
    if(formdata.passwd != formdata.passwd2){
      this.mpCorrect = true;
    }else{
      this.mpCorrect = false;
      this.user = new User();
      this.user.lastName = formdata.lastName;
      this.user.firstName = formdata.firstName;
      formdata.passwd = Md5.hashStr(formdata.passwd);
      this.user.password = formdata.passwd;
      this.user.email = formdata.email;
      this.user.inscriptionDate = this.datePipe.transform(Date.now(),'yyyy-MM-dd');
      this.user.lastConnexionDate = this.datePipe.transform(Date.now(),'yyyy-MM-dd');
      this.user.score = 0;
      this.user.questions = new Array<Number>();
      this.user.role = Role.User;
      console.log(this.user);
      let usr  = this.userService.addUser(this.user).subscribe((u:User) =>{
         console.log("Added User : "+u.id);
         localStorage.setItem('id', JSON.stringify({id : u.id}));
         this.route.navigate(['/User',u.id]);
      },
      err =>{
        console.log(err);
      });
    }
  }

}
