import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Question} from '../model/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http :  HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getQuestions(){
    return this.http.get('http://localhost:8080/questions');
  }
  addQuestion(question:Question){
    return this.http.post('http://localhost:8080/addQuestion',question,this.httpOptions);
  }
  
}
