import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../../../core/services/api.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
    selector: 'm-add-spam-contact',
    templateUrl: './add-spam-contact.component.html',
    styleUrls: ['./add-spam-contact.component.scss']
})
export class AddNewSpamContactComponent implements OnInit {
    addNewSpamContactForm: FormGroup;
    loading: boolean;
    message: string;
    showmessage: boolean;
    activity: any;
    formData: any;
    constructor(
        private dialogRef: MatDialogRef<any>,
        private formBuilder: FormBuilder,
        private _apiService: ApiService,
        public snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.addNewSpamContactForm = this.formBuilder.group({
            'email': [this.formData ? this.formData.email : null, Validators.compose([
                Validators.required,
                Validators.email,
                Validators.pattern('^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$')
            ])]
        });
        this.loading = false;
    }

    async addSpam() {
        if (this.addNewSpamContactForm.valid) {
            this.loading = true;
            this.showmessage = false;
            if (this.activity === 'edit') {
                this.addNewSpamContactForm.value['id'] = this.formData['id'];
                try {
                    const res = await this._apiService.updateSpam(this.addNewSpamContactForm.value);
                    this.loading = false;
                    this.showmessage = false;
                    this.dialogRef.close(res);
                    this.addNewSpamContactForm.reset();
                } catch (err) {
                    this.loading = false;
                    this.showmessage = true;
                    this.message = err.message;
                }
            } else {
                try {
                    const res = await this._apiService.addSpam(this.addNewSpamContactForm.value);
                    this.loading = false;
                    this.showmessage = false;
                    this.dialogRef.close(res);
                    this.addNewSpamContactForm.reset();
                } catch (err) {
                    this.loading = false;
                    this.showmessage = true;
                    this.message = err.message;
                }
            }
        }
    }


    close() {
        this.dialogRef.close('back');
    }
}
