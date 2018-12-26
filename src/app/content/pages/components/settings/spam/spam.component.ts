import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SpamDialogService } from '../../../../../core/services/spamDialog.service';
import { ApiService } from '../../../../../core/services/api.service';
import { MatSnackBar } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'm-app-spam-list',
    templateUrl: './spam.component.html',
    styleUrls: ['./spam.component.scss']
})
export class SpamComponent implements OnInit {
    page = 1;
    limit = 10000;
    spamList = new MatTableDataSource<any>();
    displayedColumns = ['email', 'edit', 'delete'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    loading = true;
    constructor(
        public _snackBar: MatSnackBar,
        public _spamDialogService: SpamDialogService,
        public _apiService: ApiService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.getSpamList();
        this.spamList.paginator = this.paginator;
    }

    async getSpamList() {
        try {
            this.spamList.data = await this._apiService.getSpamList({ 'page': this.page, limit: this.limit });
            this.loading = false;
            this._changeDetectorRef.detectChanges();
        } catch (err) {
            this.loading = false;
            console.log(err);
        }
    }

    async gotoSpam() {
        const res = await this._spamDialogService.openConfirmationBox('Are you sure ?');
        if (res === 'yes') {
            try {
                const data = await this._apiService.moveSpamFromJobProfile();
                this._snackBar.open(data.message, '', {
                    duration: 2000,
                });
            } catch (err) {
                this._snackBar.open(err.message, '', {
                    duration: 2000,
                });
            }
        }
    }

    async addSpam() {
        const res = await this._spamDialogService.openAddSpam('add');
        if (res && res['id']) {
            this.getSpamList();
        }
    }

    async deleteSpam(spamData) {
        const res = await this._spamDialogService.openConfirmationBox('Are you sure ?');
        if (res === 'yes') {
            try {
                await this._apiService.deleteSpamList(spamData.id);
                this.getSpamList();
            } catch (err) {
                console.log(err);
            }
        }
    }

    async editSpam(spamData) {
        const res = await this._spamDialogService.openAddSpam('edit', spamData);
        if (res && res['status']) {
            this.getSpamList();
        }
    }

    spamListTrack(index, data) {
        return data['id'] || index;
    }
}
