import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/services/authentication.service';

@Component({
  selector: 'app-activate-account',
  standalone: false,
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss'
})
export class ActivateAccount {

    message: string = '';
    isOkay: boolean =true;
    submitted: boolean = false;

    constructor (
    private router: Router,
    private authService: AuthenticationService
    ){}

    onCodeCompleted(token: string): void {
      this.confirmationAccount(token);
    }

    redirectToLogin(): void{
        this.router.navigate(['login']);
    }

    confirmationAccount(token: string): void {
    this.authService.confirm({
    token
    }).subscribe({
    next: () => {
    this.message = 'Your account has been successfully activated. \nNow you can proceed to login';
    this.submitted = true;
    },
    error: () => {
    this.message = 'Token has been expired or invalid';
    this.submitted = true;
    this.isOkay = false;
    }
    })
    }
}
