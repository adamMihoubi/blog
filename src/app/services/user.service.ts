import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { User } from '../model/user.model';
import { Role } from '../model/role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  boundary;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
  };


  constructor(private http: HttpClient) {
  }

  getUsers(){
    return this.http.get('http://localhost:8080/users');
  }

  getUser(email){
    return this.http.get('http://localhost:8080/user?email='+email);
  }
  getUserById(id){
    return this.http.get('http://localhost:8080/user/'+id);
  }

  addUser(user:User){
    return this.http.post('http://localhost:8080/addUser',user,this.httpOptions);
  }

  getUserRole(id){
    return this.http.get('http://localhost:8080/role/'+id);
  }

  updateUser(id,qId,score){
    return this.http.put('http://localhost:8080/user/upload/'+id+'/quesiton/'+qId+'/'+score,null,this.httpOptions);
  }

  updateScoreUser(id,score){
    return this.http.put('http://localhost:8080/user/upload/'+id+'/score/'+score,null,this.httpOptions);
  }

  updateRoleUser(id,role){
    return this.http.put('http://localhost:8080/user/upload/'+id+'/role/'+role,null,this.httpOptions);
  }

  deleteHisto(id){
    return this.http.put('http://localhost:8080/user/delete/histo/'+id,null,this.httpOptions);
  }

  getUsersRanking(){
    return this.http.get('http://localhost:8080/user/ranking');
  }

  uploadImageUser(id,formdata){
    const req = new HttpRequest('PUT', 'http://localhost:8080/user/update/'+id+'/image', formdata, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  resetPassword(email){
    return this.http.get('http://localhost:8080/user/reset/'+email);
  }
  doneResetPass(id,pass){
    return this.http.put('http://localhost:8080/user/reset/'+id+'/'+pass,null,this.httpOptions);
  }

}
