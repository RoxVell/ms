import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onLogin() {
    try {
      await this.authService.login({
        email: this.email.value,
        password: this.password.value
      });

      this.router.navigate(['/']);
    } catch (response) {
      this._snackBar.open(response.error.message, '', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 4000,
        panelClass: ['color-red']
      });
    }

  }
}
