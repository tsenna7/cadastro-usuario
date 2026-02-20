import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from "primeng/button";

import { User } from "../../../shared/models/User";

@Component({
    selector: 'app-users-info',
    imports: [DialogModule, ButtonModule],
    templateUrl: './users-info.component.html',
    styleUrl: './users-info.component.scss',
    standalone: true
})
export class UsersInfoComponent {

    @Input() user!: User;

    @Input() visible = false;

    @Output() close: EventEmitter<void> = new EventEmitter();


}
