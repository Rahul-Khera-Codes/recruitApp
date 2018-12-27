import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
// import { ScheduleInterviewComponent } from './../modules/schedule-interview/schedule-interview.component';
import { AddNewSpamContactComponent } from '../../content/pages/components/settings/models/add-spam-contact/add-spam-contact.component';
import { ConfirmationDialogComponent } from '../../content/pages/components/settings/model/confirmation-dialog.component';
// import { SetvaremailpreviewComponent } from './../modules/setvaremailpreview/setvaremailpreview.component';
// import { FetchEmailByDayComponent } from './../modules/fetch-email-by-day/fetch-email-by-day.component';
// import { CronStatusModelComponent } from './../modules/cron-status-model/cron-status-model.component';

@Injectable()
export class SpamDialogService {
    dialogRef: MatDialogRef<any>;
    constructor(public dialog: MatDialog) { }

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

    async openAddSpam(activity, formData?) {
        this.dialogRef = this.dialog.open(AddNewSpamContactComponent, {
            width: '23vw'
        });
        this.dialogRef.componentInstance.activity = activity;
        this.dialogRef.componentInstance.formData = formData;
        return await this.dialogRef.afterClosed().toPromise();
    }

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
    // }

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

    async openConfirmationBox(message) {
        this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '23vw'
        });
        this.dialogRef.componentInstance.message = message;
        return await this.dialogRef.afterClosed().toPromise();
    }

    // previewEmail(emailData) {
    //     return new Promise((resolve, reject) => {
    //         this.dialogRef = this.dialog.open(SetvaremailpreviewComponent, {
    //             height: '60%',
    //             width: '40%'
    //         });
    //         this.dialogRef.componentInstance.pendingVariables = [];
    //         this.dialogRef.componentInstance.temp = emailData;
    //         this.dialogRef.afterClosed().subscribe(result => {
    //             this.dialogRef = null;
    //             resolve();
    //         });
    //     });
    // }
}
