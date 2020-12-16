import { Component, OnInit } from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../services/user.service';
import {Role} from '../model/role.enum';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users:Array<User>;
  roles:Array<String> = new Array<String>();
  selectedOption = {
    text:String,
    id:Number
  };
  constructor(private userService : UserService) { }

  ngOnInit() {
    for(let r in Role){
      if(isNaN(Number(r))){
        this.roles.push(r);
      }
    }

    this.userService.getUsers().subscribe((users : Array<User>)=>{
      this.users = users;
    },err =>{
      console.log(err);
    })
  }

  filterRole(role:String){
    let roles = this.roles.slice();
    const index: number = roles.indexOf(role);
    if (index !== -1) {
        roles.splice(index, 1);
    }
    return roles;
  }

  saveChanges(){
    this.userService.updateRoleUser(this.selectedOption.id,this.selectedOption.text).subscribe((u:User)=>{
      console.log(u.id + " updated successfully for role : "+u.role);
    },err =>{
      console.log(err);
    });

  }
  selectChange(id,event){
    this.selectedOption.id = id;
    this.selectedOption.text = event.target.value;
  }

  validbutton(id):boolean{
    return (id === this.selectedOption.id);
  }
  deleteHisto(id){
    this.userService.deleteHisto(id).subscribe((user:User)=>{
      for (let u of this.users){
        if(user.id === u.id){
          const index : number = this.users.indexOf(u);
          this.users.splice(index,1);
          this.users.push(user);
          if(user.id == JSON.parse(localStorage.getItem("id")).id){
            localStorage.setItem('q',JSON.stringify({'q':user.questions}));
          }
        }
      }
    },err=>{
      console.log(err);
    })
  }
}
