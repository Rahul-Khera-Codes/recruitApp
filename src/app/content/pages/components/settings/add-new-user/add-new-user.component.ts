import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../../core/services/api.service';
import { config } from '../../../../../config/config';
import { Location } from '@angular/common';

@Component({
    selector: 'm-add-new-user',
    templateUrl: './add-new-user.component.html',
    styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
    addNewUserForm: FormGroup;
    loading: boolean;
    message: string;
    showmessage: boolean;
    userType: Array<string>;
    constructor(
        private formBuilder: FormBuilder,
        private _apiService: ApiService,
        private location: Location,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.addNewUserForm = this.formBuilder.group({
            'email': [null, Validators.compose([
                Validators.required,
                Validators.email,
                Validators.pattern('^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$')
            ])],
            'user_type': [null, Validators.required],
            'password': [null, Validators.required],
            'confirm_password': [null, Validators.required]
        }, { validator: this.checkIfMatchingPasswords('password', 'confirm_password') });
        this.userType = config['userType'];
    }

    ngOnInit() {
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            const passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true });
            } else {
                return passwordConfirmationInput.setErrors(null);
            }
        };
    }
    async addUser() {
        if (this.addNewUserForm.valid) {
            this.loading = true;
            this.showmessage = false;
            try {
                const res = await this._apiService.addUser(this.addNewUserForm.value);
                this.loading = false;
                this.addNewUserForm.reset();
                this.location.back();
            } catch (err) {
                console.log(err)
                this.loading = false;
                this.showmessage = true;
                this.message = err.error.message ? err.error.message : err.message;
                this._changeDetectorRef.detectChanges();
            }
        }
    }

    cancel() {
        this.location.back();
    }
}
