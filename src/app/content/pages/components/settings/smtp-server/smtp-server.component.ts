import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-smtp-server',
    templateUrl: './smtp-server.component.html',
    styleUrls: ['./smtp-server.component.scss']
})
export class SmtpServerComponent implements OnInit {
    settingJson: any[];
    loading: boolean;
    constructor(private _change: ChangeDetectorRef, private apiServices: ApiService, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.getSmtpList();
    }

    getSmtpList() {
        this.apiServices.getSmtpList().subscribe((data) => {
            this.settingJson = data;
            console.log(" this.settingJson", this.settingJson)
        },
            (err) => {
                console.log(err);
            });
        this._change.detectChanges();

    }

    test(email: string) {
        this.apiServices.testSmtp(email).subscribe(
            (data) => {
                this.getSmtpList();
                this.snackBar.open('SMTP Tested Successfully', '', {
                    duration: 2000,
                });
                this._change.detectChanges();
            },
            (err) => {
                this.snackBar.open(err.message, '', {
                    duration: 2000,
                });
            });
    }

    changeStatus(email: string, status: any) {
        if (!status) {
            this.apiServices.changeSmtpStatus(email).subscribe(
                (data) => {
                    this.getSmtpList();
                },
                (err) => {
                    this.snackBar.open(err.message, '', {
                        duration: 2000,
                    });
                });
        } else {
            this.snackBar.open('SMTP is already active', '', {
                duration: 2000,
            });
        }
        this._change.detectChanges();
    }

    remove(id: string) {
        this.apiServices.deleteSmtp(id).subscribe(
            (data) => {
                this.getSmtpList();
            },
            (err) => {
                this.snackBar.open(err.status, '', {
                    duration: 2000,
                });
            });
        this._change.detectChanges();
    }

    settingJsonTrack(index, data) {
        return data['id'] || index;
    }
}
