import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServeApiService {

  constructor(private httpClient: HttpClient) { }

  userLoginService(email:any, password:any){
    return this.httpClient.post("/users/sign_in", JSON.stringify({users: {email: email, password: password}})).subscribe((data)=>{
      console.log(data)
    }) 
  }
}
