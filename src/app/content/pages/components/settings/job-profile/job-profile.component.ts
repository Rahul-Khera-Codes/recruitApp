import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ApiService } from '../../../../../core/services/api.service';
import * as _ from 'lodash';
import { DialogService } from '../../../../../core/services/dialog.service';
import { LocalStorageService } from '../../../../../core/services/local-storage.service';
import { Router } from '@angular/router';
import { AddTagComponent } from '../add-tag/add-tag.component';
@Component({
  selector: 'm-job-profile',
  templateUrl: './job-profile.component.html',
  styleUrls: ['./job-profile.component.scss']
})
export class JobProfileComponent implements OnInit {
  dialogRef: MatDialogRef<any>;
  loading = false;
  tempList: any;
  tags: any[];
  constructor(
    public getTags: ApiService,
    public dialog: MatDialog,
    private _dialogService: DialogService,
    public viewContainerRef: ViewContainerRef,
    public snackBar: MatSnackBar,
    public _localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  onDrop(args) {
    const apiData = [];
    _.forEach(this.tags['Automatic'], (value, key) => {
      apiData.push({ 'id': value['id'], 'priority': (key + 1) })
    })
    this.getTags.updatePriority(apiData).subscribe((res) => {
    }, (err) => {
    })
  }

  ngOnInit() {
    this.loading = true;
    this.getAllTag();
    this.getAllTemp();
  }
  getAllTemp() {
    this.getTags.getTemplate().subscribe((data) => {
      this.tempList = data;
    }, (err) => {
    });
  }
  getAllTag() {
    this.getTags.getAllTags()
      .subscribe((data) => {
        this.formatTagsInArray(data);
      }, (err) => {
        this.loading = false;
      });
  }

  removeTag(id: string, type: string) {
    this._dialogService.openConfirmationBox('Are you sure ?').then((res) => {
      if (res === 'yes') {
        this.getTags.deleteTag(id, type).subscribe((data) => {
          this.loading = false;
          this.getAllTag();
          this.refreshAllTags();
        }, (err) => {
          this.loading = false;
        });
      }
    }, (err) => {
    });
  }


  openAutomatic(tag1: any) {
    this.router.navigate(['/settings/auto-matic-tag']);
    localStorage.setItem("tempList", JSON.stringify(this.tempList));
    localStorage.setItem("tag", JSON.stringify(tag1));
  }

  addTag(tag1: any) {
    localStorage.setItem("tempList", JSON.stringify(this.tempList));
    localStorage.setItem("addTagType", JSON.stringify('jobProfile'));
    this.router.navigate(['/settings/add-tag']);
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
    this.loading = false;
  }

  tagsAutomaticTrack(index, data) {
    return data['id'] || index;
  }

  refreshAllTags() {
    this.getTags.getAllTagsMains().subscribe((res) => {
      this._localStorageService.setItem('allTags', res);
    })
  }
}
