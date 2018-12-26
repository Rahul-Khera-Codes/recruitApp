import { Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
// import { ScheduleInterviewComponent } from './../modules/schedule-interview/schedule-interview.component';
// import { AddNewUserComponent } from './../modules/add-new-user/add-new-user.component';
// import { ConfirmationDialogComponent } from './../modules/confirmation-dialog/confirmation-dialog.component';
import { SetvaremailpreviewComponent } from '../../content/pages/components/settings/setVarEmailPreview/setVarEmailPreview.component';
// import { FetchEmailByDayComponent } from './../modules/fetch-email-by-day/fetch-email-by-day.component';
// import { CronStatusModelComponent } from './../modules/cron-status-model/cron-status-model.component';
// import { TokenExpireComponent } from './../modules/token-expire/token-expire.component';
// import {InterceptedHttp} from './http.interceptor';
import { Subscription } from 'rxjs/Rx';
import { ConfirmationDialogComponent } from '../../content/pages/components/settings/model/confirmation-dialog.component';

@Injectable()
export class DialogService {
    dialogRef: MatDialogRef<any>;
    expire: Subscription
    constructor(public dialog: MatDialog) {
        // this.expire = this.token.tokenExpMehtodCalled$.subscribe(() => {
        //     this.tokenExprire();
        // });
    }


    // openScheduleInterview(data) {
    //     return new Promise((resolve, reject) => {
    //         this.dialogRef = this.dialog.open(ScheduleInterviewComponent, {
    //             height: '90%',
    //             width: '70%'
    //         });
    //         this.dialogRef.componentInstance.tagId = data.id;
    //         this.dialogRef.componentInstance.emailId = data.emailId;
    //         this.dialogRef.componentInstance.dataForInterviewScheduleRound = data.dataForInterviewScheduleRound;
    //         this.dialogRef.componentInstance.tagselected = data.tagselected;
    //         this.dialogRef.componentInstance.emailData = data.emailData;
    //         this.dialogRef.afterClosed().subscribe(result => {
    //             this.dialogRef = null;
    //             if (result) {
    //                 resolve(result);
    //             } else {
    //                 resolve();
    //             }
    //         });
    //     });
    // }
    // openAddUser() {
    //     return new Promise((resolve, reject) => {
    //         this.dialogRef = this.dialog.open(AddNewUserComponent);
    //         this.dialogRef.afterClosed().subscribe(result => {
    //             this.dialogRef = null;
    //             if (result) {
    //                 resolve(result);
    //             } else {
    //                 resolve();
    //             }
    //         });
    //     });
    // }
    // getCronStatusDialog(emailParentId) {
    //     return new Promise((resolve, reject) => {
    //         this.dialogRef = this.dialog.open(CronStatusModelComponent);
    //         this.dialogRef.componentInstance.emailParentId = emailParentId;
    //         this.dialogRef.afterClosed().subscribe(result => {
    //             this.dialogRef = null;
    //             if (result) {
    //                 resolve(result);
    //             } else {
    //                 resolve();
    //             }
    //         });
    //     });
    // // }
    // fetchEmailByDay() {
    //     return new Promise((resolve, reject) => {
    //         this.dialogRef = this.dialog.open(FetchEmailByDayComponent, {
    //             'height': '180px'
    //         });
    //         this.dialogRef.afterClosed().subscribe(result => {
    //             this.dialogRef = null;
    //             resolve();
    //         });
    //     });
    // }
    openConfirmationBox(message) {
        return new Promise((resolve, reject) => {
            this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                width: '20vw',
            });
            this.dialogRef.componentInstance.message = message;
            this.dialogRef.afterClosed().subscribe(result => {
                this.dialogRef = null;
                if (result) {
                    resolve(result);
                } else {
                    resolve();
                }
            });
        });
    }

    previewEmail(emailData) {
        return new Promise((resolve, reject) => {
            this.dialogRef = this.dialog.open(SetvaremailpreviewComponent, {
                height: '60%',
                width: '40%'
            });
            this.dialogRef.componentInstance.pendingVariables = [];
            this.dialogRef.componentInstance.temp = emailData;
            this.dialogRef.afterClosed().subscribe(result => {
                this.dialogRef = null;
                resolve();
            });
        });
    }
    // confirmSubmitTestBox(message) {
    //     return new Promise((resolve, reject) => {
    //         this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //             'height': '210px',
    //             'width': '200px'
    //         });
    //         this.dialogRef.componentInstance.message = message;
    //         this.dialogRef.afterClosed().subscribe(result => {
    //             this.dialogRef = null;
    //             if (result) {
    //                 resolve(result);
    //             } else {
    //                 resolve();
    //             }
    //         });
    //     });
    // }
    // tokenExprire() {
    //     this.dialogRef = this.dialog.open(TokenExpireComponent, {
    //         height: '300px',
    //         width: '300px',
    //     });
    //     this.dialogRef.afterClosed().subscribe(result => {
    //         this.dialogRef = null;
    //     });
    // }
}
