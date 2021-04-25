import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  api = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  // method to get a list of users
  getUsers() : Observable<any[]> {
    const url = `${this.api}`;
    return this.http.get<any[]>(url);
  }

}
