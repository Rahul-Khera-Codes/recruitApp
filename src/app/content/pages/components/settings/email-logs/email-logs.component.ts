import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { DialogService } from '../../../../../core/services/dialog.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { MatPaginator } from '@angular/material';


@Component({
    selector: 'm-email-logs',
    templateUrl: './email-logs.component.html',
    styleUrls: ['./email-logs.component.scss']
})
export class EmailLogsComponent implements OnInit {
    emailLogs: any;
    searchInput = new FormControl();
    searchTerm = '';
    loading = true;
    totalPages = 0;
    limit = 100;
    displayedColumns: string[] = ['from', 'email', 'subject', 'time', 'user'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        public _apiService: ApiService,
        public _dialogService: DialogService,
        private changeDetectorRef: ChangeDetectorRef
    ) {

    }

    ngOnInit() {
        this.paginator.pageSize = this.limit;
        this.getEmailLogs();
        this.searchInput.valueChanges
            .debounceTime(500)
            .subscribe(newValue => this.search(newValue));
    }

    paginatorChange(e) {
        this.getEmailLogs();
    }

    async getEmailLogs() {
        try {
            this.loading = true;
            const res = await this._apiService.getEmailLogs({
                'page': this.paginator.pageIndex + 1,
                'email': this.searchTerm,
                'limit': this.paginator.pageSize
            });
            this.emailLogs = res['data'];
            this.totalPages = res['count'];
            this.loading = false;
            this.changeDetectorRef.detectChanges();
        } catch (e) {
            this.loading = false;
            console.log(e);
        }
    }

    previewEmail(emailData) {
        this._dialogService.previewEmail(emailData).then((res) => {
            console.log(res);
        });
    }

    search(searchText) {
        this.paginator.pageIndex = 0;
        if (searchText && searchText.length > 0) {
            this.searchTerm = searchText;
            this.getEmailLogs();
        } else {
            this.searchTerm = null;
            this.getEmailLogs();
        }
    }

}
