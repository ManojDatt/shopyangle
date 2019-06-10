import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServeApiService } from '../serve-api.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiServ: ServeApiService, private router: Router) { }
    loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  ngOnInit() {
    
  }

  onSubmit(){
    if(this.loginForm.invalid){
      Swal.fire('Oops...', 'Invalid login details !!', 'error')
    }
    else{
      var result = this.apiServ.userLoginService(this.loginForm.get('email').value, this.loginForm.get('password').value)
      result.subscribe((response:any)=>{
        if(response.code != 200){
          Swal.fire('Oops...', response.message, 'error')
        }
        else{
          localStorage.setItem('ACCESS_TOKEN', response.auth_token);
          var holder = this;
          setTimeout(function(){holder.router.navigateByUrl('/products');},100)
          
        }
        
      })
    }
  }

}
