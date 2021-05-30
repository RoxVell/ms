import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Service {
  id: number;
  name: string;
  description: string;
  isGroup: boolean;
}

export type CreateServiceCredentials = Pick<Service, 'name' | 'description' | 'isGroup'>;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(
    private http: HttpClient,
  ) { }

  getServices(isGroup?: boolean) {
    if (typeof isGroup === 'boolean') {
      return this.http.get<Service[]>(`http://localhost:3000/services?isGroup=${isGroup}`);
    } else {
      return this.http.get<Service[]>(`http://localhost:3000/services`);
    }
  }

  buildDictByServices(services: Service[]): { [key: number]: Service } {
    return services.reduce((acc: { [key: number]: Service }, service) => {
      acc[service.id] = service;
      return acc;
    }, {});
  }

  create(service: CreateServiceCredentials) {
    return this.http.post<Service>('http://localhost:3000/services', service);
  }

  edit(id: number, service: CreateServiceCredentials) {
    return this.http.put<Service>(`http://localhost:3000/services/${id}`, service);
  }

  deleteService(id: number) {
    return this.http.delete(`http://localhost:3000/services/${id}`).toPromise();
  }
}
