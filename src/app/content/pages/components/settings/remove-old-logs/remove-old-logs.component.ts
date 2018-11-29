import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'm-remove-old-logs',
  templateUrl: './remove-old-logs.component.html',
  styleUrls: ['./remove-old-logs.component.scss']
})
export class RemoveOldLogsComponent implements OnInit {
  currentUser: string;
  showloading: boolean;
  constructor(
    public dialogRef: MatDialogRef<any>,
    private _apiService: ApiService
  ) { }

  ngOnInit() {
  }

  async removeOldlogs(data) {
    this.showloading = true;
    try {
      this.dialogRef.close('close');
      this._apiService.removeOldlogs({
        'userId': this.currentUser,
        'start': data.from,
        'end': data.to
      });
      this.showloading = false;
    } catch (e) {
      this.showloading = false;
      console.log(e);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
