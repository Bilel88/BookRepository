import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RegistrationRequest } from '../../services/models/registration-request';
import { AuthenticationService } from '../../services/services/authentication.service';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  registerRequest: RegistrationRequest = {firstname: '', lastname: '',email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
      private router: Router,
      private authService: AuthenticationService
  ){}

  register(): void{
  this.errorMsg = [];
  this.authService.register({
     body: this.registerRequest
  }).subscribe({
     next: () => {
       this.router.navigate(['activate-account']);
      },
       error: (err: any) => {
         console.log(err);
         if(err.error.validationErrors){
              this.errorMsg = err.error.validationErrors;
         }else{
              this.errorMsg.push(err.error.error);
         }
       }
     })
  }

  login(): void{
  this.router.navigate(['login']);
  }

}
