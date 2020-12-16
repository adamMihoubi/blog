import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  selectedFile=undefined;
  formdata;
  isNotGoodFile = false;
  userId;
  uploaded=false;
  notSimilar=false;
  falsePass=false;
  uploadedP=false;
  constructor(private userService:UserService) { }

  get valid(){
    return (this.selectedFile != undefined);
  }
  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('id')).id;
    this.formdata = new FormGroup({
      oldpass: new FormControl("", Validators.compose([
         Validators.required,
         Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
      ])),
      pass: new FormControl("", Validators.compose([
         Validators.required,
         Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
      ])),
      pass2: new FormControl("", Validators.compose([
         Validators.required,
         Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
      ]))
    });
  }
  onFileChanged(event) {
    this.uploaded = false;
    var tmp = event.target.files[0];
    if(tmp != undefined){
      console.log(tmp.name);
      const len = tmp.name.length;
      var ext = tmp.name.substring(len-4,len);
      ext = ext.toLowerCase();
      console.log(ext);
      if(ext === '.jpg' || ext === '.png'){
        this.isNotGoodFile = false;
        this.selectedFile = tmp;
        console.log(this.selectedFile);


      }else{
        this.selectedFile = undefined;
        this.isNotGoodFile = true;
      }

    }

  }
  onUpload() {
    if(this.selectedFile != undefined){
      let formData = new FormData();
      formData.append('file',this.selectedFile,this.selectedFile.name);
      this.userService.uploadImageUser(this.userId,formData).subscribe(res=>{
        this.uploaded = true;
      },err=>{
        console.log(err);
      });
    }
 }
 UpdatePassw(data){
   this.uploadedP = false;
   if(data.pass != data.pass2){
     this.notSimilar = true;
   }else{
     this.notSimilar = false;
   }
   console.log(data);
   this.userService.getUserById(this.userId).subscribe((u:User)=> {
      data.oldpass =  Md5.hashStr(data.oldpass);
      console.log(data.oldpass + "    " + u.password);
      console.log(u);
      if(data.oldpass === u.password){
        this.falsePass = false;
        if(!this.notSimilar){
          data.pass = Md5.hashStr(data.pass);
          u.password =  data.pass;
          console.log(u);
          this.userService.addUser(u).subscribe((uu:User)=>{
            this.uploadedP = true;
          },err2=>{
            console.log(err2);
          })
        }

      }else{
        this.falsePass = true;
      }
   },err=>{
     console.log(err);
   });
 }
}
