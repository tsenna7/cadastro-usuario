import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersListComponent } from "./features/users/users-list/users-list.component";
import { PrimeNG } from 'primeng/config';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('cadastro-usuario');

  private primeng = inject(PrimeNG);


  ngOnInit(): void {

    this.primeng.ripple.set(true)
  }
}
