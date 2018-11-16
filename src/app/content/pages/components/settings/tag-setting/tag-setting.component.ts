import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ApiService } from '../../../../../core/services/api.service';
import { AddTagComponent } from './modal/add-tag/add-tag.component';
import { ManualTagComponent } from './modal/manual-tag/manual-tag.component';

@Component({
  selector: 'm-tag-setting',
  templateUrl: './tag-setting.component.html',
  styleUrls: ['./tag-setting.component.scss']
})
export class TagSettingComponent implements OnInit {
  dialogRef: MatDialogRef<any>;
  loading = false;
  tempList: any;
  tags: any[];
  constructor(public _apiService: ApiService, public dialog: MatDialog, public viewContainerRef: ViewContainerRef, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = true;
    this.getAllTemp();
    this.getAllTag();
  }
  getAllTemp() {
    this._apiService.getTemplate().subscribe((data) => {
      this.tempList = data;
    }, (err) => {
      console.log(err);
    });
  }
  getAllTag() {
    this._apiService.getAllTags()
      .subscribe((data) => {
        console.log(data);
        this.formatTagsInArray(data);
        this.loading = false;
      }, (err) => {
        console.log(err);
        this.loading = false;
      });
  }

  removeTag(id: string, type: string) {
    this._apiService.deleteTag(id, type)
      .subscribe((data) => {
        this.getAllTag();
      }, (err) => {
        console.log(err);
      });
  }

  openManual(tag: any) {
    this.dialogRef = this.dialog.open(ManualTagComponent, {
      width: '40vw',
      data: {}
    });
    this.dialogRef.componentInstance.tag = tag;
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.snackBar.open('Tag Updated Successfully', '', {
          duration: 2000,
        });
      }
      this.dialogRef = null;
      this.getAllTag();
    });
  }

  addTag() {
    this.dialogRef = this.dialog.open(AddTagComponent, {
      width: '40vw',
      data: {}
    });
    this.dialogRef.componentInstance.tempList = this.tempList;
    this.dialogRef.componentInstance.addTagType = 'manual';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'Added') {
        this.dialogRef = null;
        this.getAllTag();
      }
    });
  }


  formatTagsInArray(data: any) {
    this.tags = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === 'Default') {
        if (!this.tags['Default']) {
          this.tags['Default'] = [];
          this.tags['Default'].push(data[i]);
        } else {
          this.tags['Default'].push(data[i]);
        }
      } else if (data[i].type === 'Manual') {
        if (!this.tags['Manual']) {
          this.tags['Manual'] = [];
          this.tags['Manual'].push(data[i]);
        } else {
          this.tags['Manual'].push(data[i]);
        }
      } else if (data[i].type === 'Automatic') {
        if (!this.tags['Automatic']) {
          this.tags['Automatic'] = [];
          this.tags['Automatic'].push(data[i]);
        } else {
          this.tags['Automatic'].push(data[i]);
        }
      }

    }
    console.log(this.tags);
}
}
