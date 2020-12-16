import { Component } from '@angular/core';
import { isNull } from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'MyPrject';
  userId;
  constructor(){
    if(!isNull(localStorage.getItem('id'))) {
      this.userId = JSON.parse(localStorage.getItem('id')).id;
    }
  }
}
