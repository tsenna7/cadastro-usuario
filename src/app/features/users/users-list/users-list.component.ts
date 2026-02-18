import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { BehaviorSubject, take } from 'rxjs';
import { User } from '../../../shared/models/User';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading$ = new BehaviorSubject<boolean>(false);
  cdr = inject(ChangeDetectorRef);

  service = inject(UsersService);

  ngOnInit() {
    this.get();
  }

  get() {
    this.service
      .get()
      .pipe(take(1))
      .subscribe((resp) => {
        console.log(resp);
        this.users = resp;
        this.cdr.detectChanges();
      });
  }

  openDialog(){
    
  }
}
