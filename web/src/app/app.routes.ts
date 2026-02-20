import { Routes } from '@angular/router';
import { UsersListComponent } from './features/users/users-list/users-list.component';
import { UsersFormComponent } from './features/users/users-form/users-form.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: 'create',
    component: UsersFormComponent,
  },
  {
    path: 'edit/:id',
    component: UsersFormComponent,
  },


];
