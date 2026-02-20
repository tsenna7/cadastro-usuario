import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../../shared/models/User';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private http = inject(HttpClient);

    get() {
        return this.http.get<User[]>("http://localhost:3000/users").pipe(take(1))
    }

    create(params: any){
      return this.http.post<User>("http://localhost:3000/users", params).pipe(take(1))
    }

    update(id: string, params: any){
        return this.http.patch<User>(`http://localhost:3000/users/${id}`, params).pipe(take(1))
    }

    remove(code: string){
      return this.http.delete(`http://localhost:3000/users/${code}`).pipe(take(1))
    }

    single(id: string){
        return this.http.get<User>(`http://localhost:3000/users/${id}`).pipe(take(1))
    }
}
