import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
// import { AddEmailTempComponent } from '../add-email-temp/add-email-temp.component';
// import { TemplateEditComponent } from '../template-edit/template-edit.component';
// import { TestTemplateComponent } from '../test-template/test-template.component';
// import { LocalStorageService } from 'app/service/local-storage.service';
import { ApiService } from '../../../../../core/services/api.service';
import * as _ from 'lodash';
// import { config } from './../../config/config';
import { MatSnackBar } from '@angular/material';
// import { CommonService } from '../../service/common.service';

@Component({
    selector: 'app-email-templates',
    templateUrl: './email-templates.component.html',
    styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit {
    dialogRef: MatDialogRef < any > ;
    userVar: string[];
    sysVar: string[];
    tempData: string[];
    tags:any;
    // jobProfile:Array<any> = config.showJobProfile;
    currentJobProfile:any;
    constructor(public dialog: MatDialog,
         private getVariable: ApiService, 
         public snackBar: MatSnackBar, 
        //  public localStorageService: LocalStorageService,
        //   public commonService:CommonService
        ) { }

    ngOnInit() {
        this.getVariable.getUserVariable().subscribe((data) => {
            this.userVar = data;
        });
        this.getVariable.getSystemVariable().subscribe(data => {
            this.sysVar = data;
        });
        this.loadTemp();
        // this.currentJobProfile = this.jobProfile[0].tag_id;
        // this.tags = this.localStorageService.getItem('allTags');
        // this.jobProfile = this.commonService.jobProfile(this.tags,this.jobProfile);
    }

    loadTemp() {
        // this.getVariable.getTemplate().subscribe(data => {
        //     this.tempData = data;
        // });
    }

    addTemp() {
        // this.dialogRef = this.dialog.open(AddEmailTempComponent, {
        //     height: '90%',
        //     width: '80%'
        // });
        this.dialogRef.componentInstance.userVar = this.userVar;
        this.dialogRef.componentInstance.sysVar = this.sysVar;
        this.dialogRef.afterClosed().subscribe(result => {
            if (result === 'added') {
                this.snackBar.open('Template Added Successfully', '', {
                    duration: 2000,
                });
                this.loadTemp();
            }
            this.dialogRef = null;
        });
    }

    editTemp(temp: any) {
        // this.dialogRef = this.dialog.open(TemplateEditComponent, {
        //     height: '90%',
        //     width: '80%'
        // });
        this.dialogRef.componentInstance.userVar = this.userVar;
        this.dialogRef.componentInstance.sysVar = this.sysVar;
        this.dialogRef.componentInstance.temp = temp;
        this.dialogRef.afterClosed().subscribe(result => {
            if (result === 'updated') {
                this.snackBar.open('Template Updated Successfully', '', {
                    duration: 2000,
                });
            }
            this.dialogRef = null;
            this.loadTemp();
        });
    }

    testTemplate(temp: any) {
        // this.dialogRef = this.dialog.open(TestTemplateComponent, {
        //     height: '40%',
        //     width: '60%'
        // });
        this.dialogRef.componentInstance.temp = temp;
        this.dialogRef.afterClosed().subscribe(result => {
            if (result === 'done') {
                this.snackBar.open('Email Send Successfully', '', {
                    duration: 2000,
                });
            }
            this.dialogRef = null;
            this.loadTemp();
        });
    }

    deleteTempId(id: string) {
        // this.getVariable.deleteTemplate(id).subscribe((data) => {
        //     this.loadTemp();
        //     this.snackBar.open('Template Deleted Successfully', '', {
        //         duration: 2000,
        //     });
        // }, (err) => {
        //     console.log(err);
        //     this.snackBar.open(err.message, '', {
        //         duration: 2000,
        //     });
        // });
    }

    tempDataTrack(index, data) {
        return data['id'] || index;
    }

    change(value) {
        this.currentJobProfile = value;
    }
}
