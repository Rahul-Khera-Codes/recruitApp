import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { DialogService } from '../../../../../core/services/dialog.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'm-email-logs',
    templateUrl: './email-logs.component.html',
    styleUrls: ['./email-logs.component.scss']
})
export class EmailLogsComponent implements OnInit {
    page = 1;
    totalPages = 1;
    limit = 100;
    emailLogs: any;
    searchInput = new FormControl();
    searchTerm = '';
    loading = true;
    constructor(
        public _apiService: ApiService,
        public _dialogService: DialogService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getEmailLogs();
        this.searchInput.valueChanges
            .debounceTime(500)
            .subscribe(newValue => this.search(newValue));
    }

    async getEmailLogs() {
        try {
            this.loading = true;
            const res = await this._apiService.getEmailLogs({
                'page': this.page,
                'email': this.searchTerm,
                'limit': this.limit
            });
            this.emailLogs = res['data'];
            this.totalPages = Math.ceil(res['count'] / this.limit);
            this.loading = false;
            this.changeDetectorRef.detectChanges();
        } catch (e) {
            this.loading = false;
            console.log(e);
        }
    }

    previous() {
        --this.page;
        this.getEmailLogs();
    }

    next() {
        ++this.page;
        this.getEmailLogs();
    }

    previewEmail(emailData) {
        // this._dialogService.previewEmail(emailData).then((res) => {
        //     console.log(res);
        // });
    }

    search(searchText) {
        this.page = 1;
        if (searchText && searchText.length > 0) {
            this.searchTerm = searchText;
            this.getEmailLogs();
        } else {
            this.searchTerm = null;
            this.getEmailLogs();
        }
    }

    emailLogsTrack(index, data) {
        return data['_id'] || index;
    }

}
