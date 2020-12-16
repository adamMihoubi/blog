import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  addQuestions(){
    this.router.navigate(['/AddQuestions']);
  }
  manageUsers(){
    this.router.navigate(['/ManageUsers']);
  }
}
