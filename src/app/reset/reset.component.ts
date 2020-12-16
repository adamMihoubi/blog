import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {User} from '../model/user.model';
import { isNull } from 'util';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  formdata;
  isResetable = false;
  constructor(private userService : UserService,private route:Router) {
    if(!isNull(localStorage.getItem('id'))) {
      var id = JSON.parse(localStorage.getItem('id')).id;
      this.route.navigate(['/User',id]);
    }
   }

  ngOnInit() {
    this.formdata = new FormGroup({
       email: new FormControl("", Validators.compose([
          Validators.required,
          Validators.pattern("[^ @]+@[^ @]+\\.[^ @]+")
       ]))
    });
  }

  onClickSubmit(data) {

    this.userService.getUser(data.email).subscribe((u:User)=>{
      if(!isNull(u)){
        this.isResetable = true;
        this.userService.resetPassword(data.email).subscribe((res) =>{
          console.log(res);
        },err =>{
          console.log(err);
        })
      }
    },err=>{
      console.log(err);
    })
  }

}
