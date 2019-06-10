import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServeApiService } from '../serve-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiServ: ServeApiService) { }
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
      console.log(this.loginForm.controls)
      var result = this.apiServ.userLoginService(this.loginForm.get('email'), this.loginForm.get('password'))
      console.log(result)
    }
  }

}
