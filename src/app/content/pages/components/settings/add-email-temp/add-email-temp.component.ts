import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ApiService } from '../../../../../core/services/api.service';
import { environment } from '../../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from '../../../../../core/services/local-storage.service';
import { config } from './../../../../../config/config';
import * as _ from 'lodash';
import { CommonService } from '../../../../../core/services/common.service';

@Component({
    selector: 'app-add-email-temp',
    templateUrl: './add-email-temp.component.html',
    styleUrls: ['./add-email-temp.component.scss'],
})
export class AddEmailTempComponent implements OnInit {
    userVar: any;
    sysVar: any;
    ckeditorContent: any;
    message: string;
    showMessage: boolean;
    subject_for_genuine: string;
    tags: any;
    jobProfile: Array<any> = config.createJobProfile;
    constructor(public dialogRef: MatDialogRef<any>, private getVariable: ApiService,
        public localStorageService: LocalStorageService,
        public commonService: CommonService
    ) {
    }

    ngOnInit() {
        this.showMessage = false;
        this.subject_for_genuine = localStorage.getItem('subject_for_genuine');
        this.tags = this.localStorageService.getItem('allTags');
        this.jobProfile = this.commonService.jobProfile(this.tags, this.jobProfile);
    }

    save(form: NgForm) {
        if (form.valid) {
            this.getVariable.addTemplate(form.value).subscribe((data) => {
                form.reset();
            }, (err) => {
                this.showMessage = true;
                this.message = err.message;
            });
            this.dialogRef.close('added');
        }
    }

    sysVarTrack(index, data) {
        return data.id || index;
    }

    userVarTrack(index, data) {
        return data.id || index;
    }

    close() {
        this.dialogRef.close();
    }
}
