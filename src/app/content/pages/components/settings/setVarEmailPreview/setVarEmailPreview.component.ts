import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ApiService } from '../../../../../core/services/api.service';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'm-app-setvaremailpreview',
    templateUrl: './setVarEmailPreview.component.html',
    styleUrls: ['./setVarEmailPreview.component.scss']
})
export class SetvaremailpreviewComponent implements OnInit {
    first: boolean;
    pendingVariables: any;
    userDetails: any;
    temp: any;
    body = '';
    notGenuine: any;
    constructor(
        public dialogRef: MatDialogRef<any>,
        public apiServices: ApiService,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        if (this.pendingVariables.length > 0) {
            this.first = true;
        } else {
            this.previewEmail();
        }
    }

    setVariable(form: NgForm) {
        if (form.valid) {
            this.body = this.temp.body;
            const self = this;
            _.forEach(form.value, function (value, key) {
                self.body = _.replace(self.body, key, value);
            });
            self.temp.body = self.body;
            this.previewEmail();
        }
    }

    previewEmail() {
        this.first = false;
        this.dialogRef.updateSize('80%', '80%');
    }

    async sendEmail() {
        if (this.temp['old_campaign_name']) {
            try {
                await this.apiServices.resendEmailForTracking(this.temp);
                this.snackBar.open('Mail Send', '', {
                    duration: 2000,
                });
                this.dialogRef.close('done');
            } catch (e) {
                console.log(e);
                this.dialogRef.close('done');
            }
        } else if (this.temp['default_id'] || this.temp['tag_id']) {
            if (this.notGenuine) {
                try {
                    const data = await this.apiServices.sendToNotReplied(this.temp);
                    this.snackBar.open(`Mail Sending to ${data.no_of_candidate}`, '', {
                        duration: 2000,
                    });
                    this.dialogRef.close('done');
                } catch (err) {
                    console.log(err);
                    this.dialogRef.close('done');
                }
            } else {
                try {
                    await this.apiServices.sendEmail(this.temp);
                    this.snackBar.open('Mail Send', '', {
                        duration: 2000,
                    });
                } catch (err) {
                    console.log(err);
                    this.dialogRef.close('done');
                }
            }
        } else {
            if (this.userDetails['CandidateEmail'] && this.userDetails['CandidateName']) {
                try {
                    await this.apiServices.sendTestEmail(this.userDetails, this.temp);
                    this.snackBar.open('Email Send', '', {
                        duration: 2000,
                    });
                    this.dialogRef.close('done');
                } catch (err) {
                    this.snackBar.open(err.message, '', {
                        duration: 2000,
                    });
                    console.log(err);
                    this.dialogRef.close('done');
                }
            } else {
                this.temp['emails'] = this.userDetails['CandidateEmail'];
                try {
                    await this.apiServices.sendEmailBySeclection(this.temp);
                    this.snackBar.open('Email Send', '', {
                        duration: 2000,
                    });
                    this.dialogRef.close('done');
                } catch (err) {
                    this.snackBar.open(err.message, '', {
                        duration: 2000,
                    });
                    console.log(err);
                    this.dialogRef.close('done');
                }
            }
        }
    }

    close() {
        this.dialogRef.close('close');
    }
}
