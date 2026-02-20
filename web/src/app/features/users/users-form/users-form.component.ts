import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgIf } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

import { TabsModule } from 'primeng/tabs';
import { SelectModule } from "primeng/select";
import { MessageService } from 'primeng/api';
import { InputMaskDirective } from "primeng/inputmask";
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from "primeng/button";
import { catchError, take } from "rxjs";

import { UserGender } from "../../../shared/enums/user-gender";
import { ViacepsService } from "../../../core/services/viaceps.service";
import { UsersService } from "../users.service";
import { User } from "../../../shared/models/User";
import { UsersInfoComponent } from "../users-info/users-info.component";

@Component({
    selector: 'app-users-form',
    imports: [
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        FloatLabelModule,
        ButtonModule,
        SelectModule,
        TabsModule,
        InputMaskDirective,
        UsersInfoComponent,
        NgIf,
    ],
    templateUrl: './users-form.component.html',
    standalone: true,
    styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
    service = inject(UsersService);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    viacepsService = inject(ViacepsService);

    private messageService = inject(MessageService);

    user = signal({} as User);
    isEditing = signal(false);
    currentTab = signal(0);
    disabledAddressTab = signal(true);
    showInfo = signal(false);
    searchLoading = signal(false);

    form = inject(FormBuilder).group({
        name: ["", Validators.required],
        lastName: ["", Validators.required],
        gender: [null as any as { id: number; name: string }, Validators.required],
    });

    addressForm = inject(FormBuilder).group({
        zipcode: ["", Validators.required],
        state: ["", Validators.required],
        city: ["", Validators.required],
        street: ["", Validators.required],
        neighbourhood: ["", Validators.required],
        number: [null as any as number, Validators.required],
        complement: [""],
    });

    genders = [
        {
            id: UserGender.MALE,
            name: "Masculino",
        },
        {
            id: UserGender.FEMALE,
            name: "Feminino"
        }
    ]


    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');

        if (id) {
            this.service.single(id).subscribe(resp => {
                this.user.set(resp);
                this.setControls(resp);
                this.disabledAddressTab.set(false)
                this.isEditing.set(true)
            })
        }

    }

    setControls(user: User) {
        this.form.patchValue({
            name: user.name,
            lastName: user.lastName,
            gender: user.gender
        });

        this.addressForm.patchValue({
            zipcode: user.zipcode,
            state: user.state,
            city: user.city,
            street: user.street,
            neighbourhood: user.neighbourhood,
            number: user.number,
            complement: user.complement
        })
    }

    addressTab() {
        this.currentTab.set(1);
    }

    firstTab() {
        this.currentTab.set(0);
    }

    save() {
        const paramsToSend = {
            ...this.form.getRawValue(),
            ...this.addressForm.getRawValue()
        }

        if (this.isEditing()) {
            this.service.update(this.user().id, paramsToSend).pipe(take(1)).subscribe((resp => {
                this.afterSave(resp, true);
            }))
        } else {
            this.service.create(paramsToSend).subscribe((resp: User) => {
                this.afterSave(resp);
            })
        }
    };

    afterSave(user: User, isUpdate = false) {
        this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: isUpdate ? 'Usuário editado com sucessp' : 'Usuário criado com sucesso'
        });

        this.user.set(user);
        this.showInfo.set(true);
    }

    close() {
        this.showInfo.set(false);
        this.backToList();
    }

    backToList() {
        this.router.navigateByUrl("/");
    }

    search() {
        const value = this.addressForm.controls.zipcode.value! as string;

        if (!value) return

        this.searchLoading.set(true);

        const normalizedCep = value.replace(/\D/g, '');

        if (normalizedCep)
            this.viacepsService.get(normalizedCep).pipe(catchError(err => {
                this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro interno'});
                setTimeout(() => {
                    this.searchLoading.set(false);
                }, 250);

                throw err
            })).subscribe((resp) => {
                if (resp.erro) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'CEP não encontrado',
                        detail: 'Verifique o CEP informado e tente novamente'
                    });
                    return;
                }

                this.addressForm.controls.street.setValue(resp.logradouro!);
                this.addressForm.controls.state.setValue(resp.estado!);
                this.addressForm.controls.city.setValue(resp.localidade!);

                setTimeout(() => {
                    this.searchLoading.set(false);
                }, 250);

            })
    }

}
