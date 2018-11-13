import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'm-imap-server',
    templateUrl: './imap-server.component.html',
    styleUrls: ['./imap-server.component.scss']
})
export class ImapServerComponent implements OnInit {
    imapSettingJson: any;
    loading: boolean;
    constructor(
        private _apiService: ApiService,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.getImapList();
    }

    async getImapList() {
        try {
            this.imapSettingJson = await this._apiService.getImapList();
            console.log("this.imapSettingJson",this.imapSettingJson)
        } catch (e) {
            console.log(e);
        }
    }
    async activateImap(email: string) {
        try {
            const res = await this._apiService.activateImap(email);
            this.getImapList();
        } catch (e) {
            console.log(e);
            this.snackBar.open(e.message ? e.message : e, '', {
                duration: 2000,
            });
        }
    }

    async remove(id: string) {
        try {
            const res = await this._apiService.deleteImap(id);
            this.getImapList();
        } catch (e) {
            console.log(e);
            this.snackBar.open(e.message ? e.message : e, '', {
                duration: 2000,
            });
        }
    }

    imapSettingJsonTrack(index, data) {
        return data['id'] || index;
    }
}
