import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Operator {
  id: number;
  email: string;
  name: string;
}

export interface CreateUserCredentials {
  email: string;
  name: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {
  constructor(
    private http: HttpClient
  ) { }

  getOperators() {
    return this.http.get<Operator[]>('http://localhost:3000/operators');
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/users/${id}`).toPromise();
  }

  createOperator(operator: CreateUserCredentials) {
    return this.http.post(`http://localhost:3000/operators`, { ...operator }).toPromise();
  }

  editOperator(id: number, operator: CreateUserCredentials) {
    return this.http.put(`http://localhost:3000/users/${id}`, { ...operator, role: 'operator' }).toPromise();
  }
}
