import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig, MatDialogRef, MatSnackBar, MatChipInputEvent } from '@angular/material';
import { ApiService } from '../../../../../../../core/services/api.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { NgForm, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'm-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {
  tag: any;
  types: number;
  type: any;
  tempList: any;
  showMessage: boolean;
  showloading: boolean;
  message: string;
  addTagType: string;
  tags = [];
  separatorKeysCodes = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  constructor(public _apiService: ApiService,public _snackBar: MatSnackBar,private tagUpdate: ApiService, private dialogRef: MatDialogRef<AddTagComponent>) { }

  ngOnInit() {
    if (this.addTagType === 'manual') {
      this.types = 0;
      this.type = 'Manual';
  } else if (this.addTagType === 'automatic' || this.addTagType === 'jobProfile') {
      this.type = 'Automatic';
      this.types = 1;
  }
  this.showMessage = false;
  this.showloading = false;
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
        this.tags.push(value.trim());
    }
    if (input) {
        input.value = '';
    }
}

remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
        this.tags.splice(index, 1);
    }
}

addTag(form: NgForm) {
    this.showMessage = false;
    this.showloading = true;
    if (form.valid) {
        if (this.addTagType === 'jobProfile') {
            form.value.is_job_profile_tag = 1;
            form.value.keyword = (this.tags && this.tags.length) ? this.tags.toString() : null;
        }
        if (form.value.assign === '') {
            form.value.assign = false;
        }
        if (form.value.is_email_send === '') {
            form.value.is_email_send = false;
        }
        this.tagUpdate.addTag(form.value).subscribe((data) => {
            form.reset();
            this.showloading = true;
            this._snackBar.open('Job Profile Added', '', {
                duration: 2000
            })
        }, (err) => {
            this.showMessage = true;
            this.showloading = false;
            this.message = err.message;
        });
        this.dialogRef.close('Added');
    }
}

tempListTrack(index, data) {
    return data.id || index;
}

close() {
    this.dialogRef.close();
}
}
