import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet,
        ToastModule
    ],
    templateUrl: './app.html',
    standalone: true,
    styleUrl: './app.scss'
})
export class App implements OnInit {
    protected readonly title = signal('cadastro-usuario');

    private primeng = inject(PrimeNG);


    ngOnInit(): void {

        this.primeng.ripple.set(true)
    }
}
