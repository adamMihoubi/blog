import { Component, OnInit } from '@angular/core';
import {Question} from '../model/question.model';
import {QuestionService} from '../services/question.service'
import {UserService} from '../services/user.service';
import {Level} from '../model/level.enum';
import {User} from '../model/user.model';
import { timer } from 'rxjs';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question:Question;
  questions:Array<Question>;
  right;
  score;
  count=0;
  endGame = false;
  userQ:Array<Number>;
  userId;
  questionResponded = false;

  constructor(private questionService:QuestionService,private userService : UserService) { }

  ngOnInit() {

    this.questionService.getQuestions().subscribe((questionGetted : Question[]) =>{
      this.questions = questionGetted;
      this.question = questionGetted[this.count];
      this.userId = JSON.parse(localStorage.getItem('id')).id;
      this.userQ = JSON.parse(localStorage.getItem('q')).q;
      while(this.userQ.includes(this.question.id) ){
        this.count ++;
        this.question = questionGetted[this.count];
        if(this.count >= this.questions.length){
          this.endGame = true;
          break;
        }

      }
    },
    err=>{
      console.log(err);
    })
  }

  verifyUserResp(userResp){
    let score = 0;
    if(userResp == this.question.answer) {
      this.right =false;
      score = this.calculateScore(this.question);
      this.userService.updateUser(this.userId,this.question.id,score).subscribe((u:User)=>{
        localStorage.setItem('q',JSON.stringify({'q':u.questions}));
        this.userQ = u.questions;
        this.questionResponded=true;
        this.nextQuestion();
        this.getUnresponded();
        this.verifyEndedGame();
      },
      err =>{
        console.log(err);
      });

    }else {
      this.right = true;
      let score  = this.calculateScore(this.question);
      this.userService.updateScoreUser(this.userId,score).subscribe((u:User)=>{
        console.log(u.score);
        this.score = u.score;
      },err=>{
        console.log(err);
      })
      const t = timer(1000);
      t.subscribe(v=>{
        this.right = false;
      });


    }
  }

  calculateScore(q:Question):number{
    let score;
    if(Level[q.level.toString()] == Level.Easy) score = 5;
    else {
      score = Level[q.level.toString()] * 10;
    }
    return score;
  }

  nextQuestion(){
    if(this.count < this.questions.length){
      if(this.count+1 == this.questions.length){
        this.questionResponded = true;
      }else{
        this.count = this.count +1;
        this.question = this.questions[this.count];
        if(this.userQ.includes(this.question.id)){
          this.questionResponded = true;
        }else{
          this.questionResponded = false;
        }
      }
    }

  }
  pastQuestion(){
    if(this.count-1 >= 0){
      this.count = this.count - 1;
      this.question = this.questions[this.count];
      if(this.userQ.includes(this.question.id)){
        this.questionResponded = true;
      }else{
        this.questionResponded = false;
      }
    }
  }
  private getUnresponded(){
    if(this.questionResponded){
      for (let i = this.count; i>=0;i--){
        if(!this.userQ.includes(this.questions[i].id)){
          this.question = this.questions[i];
          this.count = i;
          this.questionResponded = false;
        }
      }
    }
  }
  verifyEndedGame(){
    this.endGame =true;
      for(let question of this.questions){
        if(!this.userQ.includes(question.id)){
          this.endGame = false;
        }
      }
  }

  isNextable(){
    if(this.questions != undefined){
      if(this.count+1 === this.questions.length)return true;
      else return false;
    }
  }
  isPastable(){
    if(this.count-1 < 0)return true;
    else return false;
  }


}
