import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
// import { SetvaremailpreviewComponent } from '../setvaremailpreview/setvaremailpreview.component';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
    selector: 'app-test-template',
    templateUrl: './test-template.component.html',
    styleUrls: ['./test-template.component.scss']
})
export class TestTemplateComponent implements OnInit {
    dialogConfig: MatDialogRef<any>;
    first: boolean;
    userDetails: any;
    temp: any;
    filteredTemp: any;
    subject: string;
    templateName: string;
    subject_for_genuine: string;
    pendingVariables: any;
    constructor(public setvardialog: MatDialog, public dialogRef: MatDialogRef<any>, public getTemp: ApiService) { }

    ngOnInit() {
        this.first = true;
        this.subject = this.temp.subject;
        this.templateName = this.temp.templateName;
        this.subject_for_genuine = localStorage.getItem('subject_for_genuine');
        this.getTemp.testTemplate(this.temp.id).subscribe((data) => {
            this.filteredTemp = this.temp;
            this.filteredTemp.body = data;
        }, (err) => {
            console.log(err);
        });
    }

    save(form: NgForm) {
        if (form.valid) {
            this.userDetails = form.value;
            this.first = false;
            this.dialogRef.updateSize('80%', '80%');
            this.replaceUserName(this.userDetails.CandidateName);
            this.getUnsavedVariable();
        }
    }

    replaceUserName(candidateName: string) {
        this.temp.body = _.replace(this.temp.body, '#candidate_name', candidateName);
    }

    setVariable() {
        // this.dialogConfig = this.setvardialog.open(SetvaremailpreviewComponent, {
        //     height: '60%',
        //     width: '40%'
        // });
        this.filteredTemp.subject = this.subject_for_genuine + ' ' + this.filteredTemp.subject;
        this.filteredTemp.subject = this.filteredTemp.subject;
        this.dialogConfig.componentInstance.pendingVariables = this.pendingVariables;
        this.dialogConfig.componentInstance.temp = this.filteredTemp;
        this.dialogConfig.componentInstance.userDetails = this.userDetails;
        this.dialogConfig.afterClosed().subscribe(result => {
            if (result === 'done') {
                this.dialogConfig = null;
                this.dialogRef.close('done');
            }
            this.dialogConfig = null;
        });
    }

    getUnsavedVariable() {
        const stringtocheck = this.filteredTemp.body;
        const regx = /#[\w-]+\|[\w -\.,@$%&*!:%^\\\/]+\||#[\w-]+/ig;
        let result = stringtocheck.match(regx);
        this.pendingVariables = [];
        if (result !== null && result.length > 0) {
            result = _.uniq(result);
            result.map((str) => {
                const start_pos = str.indexOf('|') + 1;
                const end_pos = str.indexOf('|', start_pos);
                const defaultValue = str.substring(start_pos, end_pos);
                this.pendingVariables.push({ name: str, value: defaultValue });
            });
        }
    }

    close() {
        this.dialogRef.close();
    }

}
