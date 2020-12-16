import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from '../services/user.service';
import {User} from '../model/user.model';
import {Md5} from 'ts-md5/dist/md5';
import {HttpResponse} from '@angular/common/http';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { isNull } from 'util';



@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  params;
  encode;
  ok=false;
  badPass = false;
  user:User;
  formdata;
  update=false;
  constructor(private route:ActivatedRoute,private router:Router,private userService:UserService) {
    if(!isNull(localStorage.getItem('id'))) {
      var id = JSON.parse(localStorage.getItem('id')).id;
      this.router.navigate(['/User',id]);
    }
    this.formdata = new FormGroup({
      pass1: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
      ])),
      pass2: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
      ]))
    })
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.params = params;
      this.userService.getUserById(this.params.id).subscribe((u:User)=>{
        this.user=u;
        this.encode  =  String(u.id) + u.firstName ;
        this.encode = Md5.hashStr(this.encode) ;
        var enc = new String(this.encode);
        enc = enc.toUpperCase();
        if(enc === this.params.hash){
          this.ok = true;
        }
      },err=>{
        console.log(err);
      })
      console.log(this.params);
    });
  }


  onClickSubmit(formdata){
    if(formdata.pass1 === formdata.pass2){
      this.badPass = false;
      let pass = Md5.hashStr(formdata.pass1);
      this.userService.doneResetPass(this.params.id,pass).subscribe((resp:User)=>{
        console.log(resp.id);
        console.log(this.params.id);
        if(resp.id === Number(this.params.id)){
          this.update= true;
          let t = timer(2000);
          t.subscribe(r=>{
            this.router.navigate(['/Welcome']);
          });
        }
      },err=>{
        console.log(err);
      })
    }else{
      this.badPass = true;
    }
  }

}
