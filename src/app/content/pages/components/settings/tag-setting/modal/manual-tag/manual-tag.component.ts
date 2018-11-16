import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig, MatDialogRef, MatSnackBar, MatChipInputEvent } from '@angular/material';
import { ApiService } from '../../../../../../../core/services/api.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { NgForm, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'm-manual-tag',
  templateUrl: './manual-tag.component.html',
  styleUrls: ['./manual-tag.component.scss']
})
export class ManualTagComponent implements OnInit {
  tag: any;
  originalcolor = '#e67e22';
  originaltitle = '';
  constructor(public dialogRef: MatDialogRef<any>, private tagupdate: ApiService) { }

  ngOnInit() {
  }
  save() {
    this.tag.title = this.originaltitle;
    this.tag.color = this.originalcolor;
    this.tagupdate.updateTag(this.tag, this.tag.type).subscribe((data) => {
        this.dialogRef.close('saved');
    }, (err) => {
        console.log(err);
    });
}

close() {
    this.dialogRef.close('closed');
}
}
