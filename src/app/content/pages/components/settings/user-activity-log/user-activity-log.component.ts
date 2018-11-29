import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';
import { ApiService } from '../../../../../core/services/api.service';
import { RemoveOldLogsComponent } from '../remove-old-logs/remove-old-logs.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
    selector: 'm-user-activity-log',
    templateUrl: './user-activity-log.component.html',
    styleUrls: ['./user-activity-log.component.scss']
})
export class UserActivityLogComponent implements OnInit {
    usersLog: any;
    selectUserLog: any;
    selectUserLogFullData: any;
    pageNo = 0;
    recordPerPage = 100;
    totalPages: number;
    selectedUserEmail: string;
    errorMessage: string;
    dialogRef: MatDialogRef<any>;
    loading = true;
    constructor(
        public _apiService: ApiService,
        public dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getUserList();
    }

    async getUserLogs() {
        this.errorMessage = '';
        try {
            const data = await this._apiService.getHistory({ 'email': this.selectedUserEmail });
            this.loading = false;
            _.forEach(data['data'], (value, key) => {
                _.forEach(value['action'], (actionValue, actionKey) => {
                    data['data'][key]['action'][actionKey] = actionValue.substr(0, actionValue.indexOf('?'));
                    data['data'][key]['json'][actionKey] = JSON.stringify(data['data'][key]['json'][actionKey]);
                });
            });
            this.selectUserLogFullData = data['data'][0] || [];
            this.errorMessage = data['message'];
            if (data['data'][0]) {
                this.totalPages = Math.ceil((this.selectUserLogFullData['action'].length || 0) / this.recordPerPage);
                this.paginate(data['data'][0]);
            }
            this._changeDetectorRef.detectChanges();
        } catch (e) {
            console.log(e);
            this.loading = false;
        }
    }

    async getUserList() {
        try {
            const res = await this._apiService.getUserList({ 'page': 1, limit: 100 });
            this.usersLog = res['data'];
            this.selectedUserEmail = res['data'][0]['email'];
            this.selectUserLog = { 'email': res['data'][0]['email'] };
            this.getUserLogs();
            this._changeDetectorRef.detectChanges();
        } catch (e) {
            console.log(e);
            this.loading = false;
        }
    }

    paginate(data) {
        data = JSON.parse(JSON.stringify(data));
        this.selectUserLog = { 'email': data['email'] };
        const startRec = this.pageNo * this.recordPerPage;
        const endRec = startRec + this.recordPerPage;
        this.selectUserLog['action'] = _.slice(data.action, startRec, endRec);
        this.selectUserLog['json'] = _.slice(data.json, startRec, endRec);
        this.selectUserLog['time'] = _.slice(data.time, startRec, endRec);
    }

    next() {
        ++this.pageNo;
        this.paginate(this.selectUserLogFullData);
    }
    previous() {
        --this.pageNo;
        this.paginate(this.selectUserLogFullData);
    }

    selectedUser(logData) {
        this.selectedUserEmail = logData['email'];
        this.getUserLogs();
        this.pageNo = 0;
        this.selectUserLogFullData = [];
        this.selectUserLog = { 'email': logData['email'] };
        this.loading = true;
    }

    usersLogTrack(index, data) {
        return data['id'] || index;
    }

    selectUserLogActionTrack(index, data) {
        return index;
    }

    removeLogs() {
        this.dialogRef = this.dialog.open(RemoveOldLogsComponent, {
            width: '40%'
        });
        this.dialogRef.componentInstance.currentUser = this.selectedUserEmail;
        this.dialogRef.afterClosed().subscribe(result => {
            if (result === 'close') {
                this.getUserLogs();
            }
        });

    }

}
