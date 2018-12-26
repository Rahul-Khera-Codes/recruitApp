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
  originalColor = '';
  originalTitle = '';
  constructor(public dialogRef: MatDialogRef<any>, private tagupdate: ApiService) { }

  ngOnInit() {
  }
  save() {
    this.tag.title = this.originalTitle;
    this.originalColor=this.tag.color
    this.tagupdate.updateTag(this.tag, this.tag.type).subscribe((data) => {
        this.dialogRef.close('saved');
    }, (err) => {
    });
}

close() {
    this.dialogRef.close('closed');
}
}
