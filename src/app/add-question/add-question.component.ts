import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {Cathegory} from '../model/cathegory.enum';
import {Level} from '../model/level.enum';
import {Question} from '../model/question.model';
import {QuestionService} from '../services/question.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  formdata;
  cathegories:Array<String>;
  levels:Array<String>;
  responses:Array<String>;
  isNotAcceptable;
  isAdded = false;

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
    this.cathegories = new Array<String>();
    this.levels = new Array<String>();
    for (let cat in Cathegory){
      if(isNaN(Number(cat))){
        this.cathegories.push(cat);
      }
    }
    for (let level in Level){
      if(isNaN(Number(level))){
        this.levels.push(level);
      }
    }
    console.log(this.cathegories);
    this.formdata = new FormGroup({
       question: new FormControl("", Validators.compose([
          Validators.required
       ])),
       answer: new FormControl("", Validators.compose([
          Validators.required
       ])),
       resp0: new FormControl("", Validators.compose([
         Validators.required
       ])),
       resp1: new FormControl("", Validators.compose([
         Validators.required
       ])),
       resp2: new FormControl("", Validators.compose([
         Validators.required
       ])),
       resp3: new FormControl("", Validators.compose([
         Validators.required
       ])),
       cat: new FormControl(this.cathegories[0],Validators.compose([
         Validators.required
       ])),
       level: new FormControl(this.levels[0],Validators.compose([
         Validators.required
       ]))
    });
  }


  registerQuestion(formdata){
    this.responses = new Array(
      formdata.resp0,
      formdata.resp1,
      formdata.resp2,
      formdata.resp3
    )
    this.isNotAcceptable = true;
    console.log(this.responses);
    for (let el in this.responses){
      if(this.responses[el] === formdata.answer){
        this.isNotAcceptable = false;
      }
    }
    if(!this.isNotAcceptable){
      let question = new Question();
      question.question = formdata.question;
      question.answer = formdata.answer;
      question.responses = this.responses;
      question.level = formdata.level;
      question.cathegory = formdata.cat;

      console.log(question);
      this.questionService.addQuestion(question).subscribe( (q:Question)=>{
        console.log("Added question : "+q.id);
        this.isAdded = true;
        const t = timer(4000);
        t.subscribe(v => {
          console.log("Timer");
          this.isAdded = false;
          this.formdata.reset();
        })
      },
      err => {
        console.log(err);
      });
    }

  }
}
