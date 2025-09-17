import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationRequest } from '../../services/models/authentication-request';
import { AuthenticationResponse } from '../../services/models/authentication-response';
import { AuthenticationService } from '../../services/services/authentication.service';
import { Token } from '../../services/token/token';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];
  constructor (
    private router: Router,
    private authService: AuthenticationService,
    private tokenService :Token
  ){}

  login():void {
      this.errorMsg = [];
      this.authService.authenticate({
      body: this.authRequest
      }).subscribe({
      next: (res: AuthenticationResponse): void => {
      this.tokenService.token =res.token as string;
      this.router.navigate(['books']);
      },
      error: (err: any): void => {
      console.log(err);
      if(err.error.validationErrors){
      this.errorMsg = err.error.validationErrors;
      }else{
      this.errorMsg.push(err.error.error);
      }
      }
      })
  }


  register():void {
      this.router.navigate(['register']);
  }

}
