import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DialogService } from './../../../../../core/services/dialog.service';
@Component({
    selector: 'app-single-template',
    templateUrl: './single-template.component.html',
    styleUrls: ['./single-template.component.scss']
})
export class SingleTemplateComponent implements OnInit {
    open: boolean;
    @Input() temp: any;
    @Output() edits = new EventEmitter<any>();
    @Output() deleteTemp = new EventEmitter<string>();
    @Output() testTemp = new EventEmitter<any>();
    constructor(
        public _dialogService: DialogService
    ) { }

    ngOnInit() {
        this.open = false;
    }

    delete(id: string) {
        this._dialogService.openConfirmationBox('Are you sure ?').then((res) => {
            if (res === 'yes') {
                this.deleteTemp.emit(id);
            }
        }, (err) => {
            console.log(err);
        });
    }

    edit(temp: any) {
        this.edits.emit(temp);
    }

    test(temp: any) {
        this.testTemp.emit(temp);
    }
}
