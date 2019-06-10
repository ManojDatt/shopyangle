import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServeApiService {

  constructor(private httpClient: HttpClient) { }
  
  userLoginService(email:any, password:any){
    var httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    return this.httpClient.post( environment.apiUrl+"/users/sign_in", JSON.stringify({user: {email: email, password: password}}), httpOption)
  }

  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  getAuthToken(){
    return localStorage.getItem('ACCESS_TOKEN')
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.getAuthToken()
    })
  }

  productsListService(page){
    return this.httpClient.get( environment.apiUrl+"/products?page="+page.toString(), this.httpOptions)
  }

  productsDetailService(id){
    return this.httpClient.get( environment.apiUrl+"/products/"+id.toString(), this.httpOptions)
  }


  searchroductsListService(query:any){
    return this.httpClient.get( environment.apiUrl+"/products/search?q="+query, this.httpOptions)
  }
}
