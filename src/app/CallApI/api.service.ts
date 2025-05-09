import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {}

  // GET danh sách nhóm
  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST thêm nhóm mới
  addGroup(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
