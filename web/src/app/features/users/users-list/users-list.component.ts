import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { BehaviorSubject, take } from 'rxjs';
import { User } from '../../../shared/models/User';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from "@angular/router";
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from "primeng/api";

@Component({
    selector: 'app-users-list',
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        TooltipModule
    ],
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    standalone: true
})
export class UsersListComponent implements OnInit {

    cdr = inject(ChangeDetectorRef);
    service = inject(UsersService);
    router = inject(Router);
    private messageService = inject(MessageService);

    users: User[] = [];
    loading = signal(false);

    ngOnInit() {
        this.get();
    }

    get() {
        this.loading.set(true);
        this.service
            .get()
            .pipe(take(1))
            .subscribe((resp) => {
                this.loading.set(false)
                this.users = resp;
                this.cdr.detectChanges();
            });
    }

    openDialog() {
        this.router.navigateByUrl("/create")
    }

    edit(user: User) {
        this.router.navigateByUrl(`/edit/${user.id}`)
    }

    remove(user: User) {
        this.service.remove(user.id).subscribe(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário removido com sucesso'
            });
            this.get();
        })
    }
}
