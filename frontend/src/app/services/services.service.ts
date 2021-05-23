import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Operator } from "../operators/operators.service";

interface Service {
  id: number;
  name: string;
  description: string;
  isGroup: boolean;
}

type CreateServiceCredentials = Pick<Service, 'name' | 'description'>;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(
    private http: HttpClient,
  ) { }

  create(service: CreateServiceCredentials) {
    return this.http.post<Service>('http://localhost:3000/services', service);
  }
}
