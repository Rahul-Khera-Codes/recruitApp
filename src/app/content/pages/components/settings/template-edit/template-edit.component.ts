import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';
import { LocalStorageService } from '../../../../../core/services/local-storage.service';
import * as _ from "lodash";
import { CommonService } from '../../../../../core/services/common.service';
import { config } from './../../../../../config/config';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
    selector: 'app-template-edit',
    templateUrl: './template-edit.component.html',
    styleUrls: ['./template-edit.component.scss']
})
export class TemplateEditComponent implements OnInit {
    userVar: any;
    sysVar: any;
    updateData: any;
    ckeditorContent: any;
    tempName: string;
    subject: string;
    temp: any;
    subject_for_genuine: string;
    tags: any;
    jobProfile: Array<any> = config.createJobProfile;
    tempJobProfileId: any;
    constructor(public dialogRef: MatDialogRef<any>,
        private getVariable: ApiService,
        public localStorageService: LocalStorageService,
        public commonService: CommonService
    ) {
    }

    ngOnInit() {
        this.tempJobProfileId = this.temp.job_profile;
        this.tempName = this.temp.templateName;
        this.subject = this.temp.subject;
        this.ckeditorContent = this.temp.body;
        this.subject_for_genuine = localStorage.getItem('subject_for_genuine');
        this.tags = this.localStorageService.getItem('allTags');
        this.jobProfile = this.commonService.jobProfile(this.tags, this.jobProfile);
    }

    update(form: NgForm) {
        this.updateData = {
            'templateName': this.tempName,
            'subject': this.subject,
            'body': this.ckeditorContent,
            'job_profile': form.value.job_profile,
        };
        this.getVariable.updateTemplate(this.updateData, this.temp.id).subscribe((data) => {
            form.reset();
            this.dialogRef.close('updated');
        }, (err) => {
            console.log(err);
        });
    }

    close() {
        this.dialogRef.close();
    }
}
