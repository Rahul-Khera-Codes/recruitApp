import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../../core/services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'm-app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    loading: boolean;
    message: string;
    showmessage: boolean;
    constructor(
        private formBuilder: FormBuilder,
        private _apiService: ApiService,
        public snackBar: MatSnackBar,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.resetPasswordForm = this.formBuilder.group({
            'old_password': [null, Validators.required],
            'new_password': [null, Validators.required]
        });
    }

    ngOnInit() {
        this.loading = false;
    }

    async resetPassword() {
        if (this.resetPasswordForm.valid) {
            this.loading = true;
            this.message = null;
            try {
                const res = await this._apiService.resetPassword(this.resetPasswordForm.value);
                this.loading = false;
                this.snackBar.open(res.message, '', {
                    duration: 2000,
                });
                this.resetPasswordForm.reset();
                this._changeDetectorRef.detectChanges();
            } catch (err) {
                this.loading = false;
                this.message = err['error']['message'];
                this.resetPasswordForm.reset();
                this._changeDetectorRef.detectChanges();
            }
        }
    }
}
