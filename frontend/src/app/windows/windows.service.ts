import { Injectable } from '@angular/core';
import { WINDOW_TYPE } from "../../../../backend/src/windows/dto/window-type";
import { HttpClient } from "@angular/common/http";
import { CreateWindowDto } from "../../../../backend/src/windows/dto/create-window.dto";
import { map } from "rxjs/operators";

export interface Window {
  id: number;
  name: string;
  type: WINDOW_TYPE;
  serviceIds: number[];
  operatorIds: number[];
}

@Injectable({
  providedIn: 'root'
})
export class WindowsService {
  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    return this.http.get<Window[]>('http://localhost:3000/windows')
      .pipe(
        map((windows) => {
          return windows.map((window) => ({
            ...window,
            serviceIds: window.serviceIds.map((service) => Number(service)),
            operatorIds: window.operatorIds.map((service) => Number(service)),
          }));
        })
      );
  }

  create(dto: CreateWindowDto) {
    return this.http.post<Window>('http://localhost:3000/windows', dto);
  }

  edit(id: number, dto: CreateWindowDto) {
    return this.http.put<Window>(`http://localhost:3000/windows/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/windows/${id}`);
  }
}
