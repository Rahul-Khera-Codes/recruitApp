import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApiService } from '../../../../../core/services/api.service';
import { MatDialog, MatDialogConfig, MatChipInputEvent } from '@angular/material';
import * as moment from 'moment';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { NgForm, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'm-auto-matic-tag',
    templateUrl: './auto-matic-tag.component.html',
    styleUrls: ['./auto-matic-tag.component.scss']
})
export class AutoMaticTagComponent implements OnInit {
    tag: any;
    tempList: any;
    originalcolor = '';
    originaltitle = '';
    temp_id: any;
    tags = [];
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    tagStatus: any;
    constructor(private tagupdate: ApiService, private _location: Location) { }

    ngOnInit() {
        this.tempList = JSON.parse(localStorage.getItem('tempList'));
        this.tag = JSON.parse(localStorage.getItem('tag'));
        this.tagStatus = this.tag.active_status;
        if (this.tag.active_status) {
            if (this.tag.keyword === null || this.tag.keyword === ['']) {
                this.tags = [];
            } else {
                this.tags = this.tag.keyword.split(',');
            }
            this.originaltitle = this.tag.title;
            this.originalcolor = this.tag.color
            this.temp_id = this.tag.template_id;
            if (this.tag['from']) {
                this.tag['from'] = moment(this.tag['from']).format('YYYY-MM-DD');
            }
            if (this.tag['to']) {
                this.tag['to'] = moment(this.tag['to']).format('YYYY-MM-DD');
            }
        }
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

    save() {
        if (this.tags.length === 0) {
            this.tag.keyword = null;
        } else {
            this.tag.keyword = this.tags.toString();
        }
        this.tag.title = this.originaltitle;
        this.originalcolor = this.tag.color
        this.tag.template_id = this.temp_id;
        this.tagupdate.updateTag(this.tag, this.tag.type).subscribe((data) => {
            this.close();
        }, (err) => {
            console.log(err);
        });
    }

    close() {
        this._location.back();
    }
    enableJobtag(tagStatus) {
        if (tagStatus) {
            const body = { id: this.tag.id, status: tagStatus };
            this.tagupdate.closeJobProfile(body).subscribe(data => {
                this.close()
            }, err => {
                console.log(err);
            });
        }
    }


}
