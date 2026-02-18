import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  get(){
    return this.http.get<User[]>("http://localhost:3000/users").pipe(take(1))
  }
}
