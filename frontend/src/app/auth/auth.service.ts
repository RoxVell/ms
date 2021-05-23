import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface LoginCreds {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) {}

  getToken() {
    return localStorage.getItem('token');
  }

  login(loginCreds: LoginCreds) {
    return this.http.post<{ token: string }>(`http://localhost:3000/auth/login`, loginCreds).toPromise()
      .then((result) => {
        localStorage.setItem('token', result.token);
      });
  }

  register() {

  }

  logout() {
    localStorage.removeItem('token');
  }
}
