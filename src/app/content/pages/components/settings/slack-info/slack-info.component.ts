import {
    Component,
    OnInit,
    ChangeDetectorRef
} from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'slack-info',
    templateUrl: './slack-info.component.html',
    styleUrls: ['./slack-info.component.scss']
})
export class SlackInfoComponent implements OnInit {
    slackJson: any[];
    loading = true;
    selectchannel: any;
    showmessage = true;
    message: any;
    constructor(public _apiService: ApiService, private _change: ChangeDetectorRef) { }
    ngOnInit() {
        this.getSlackList();
    }
    select(index, id) {
        const refData = Object.assign({}, this.slackJson[index]);
        delete refData['channel_list'];
        this.updateSlackList(refData, id);
        this._change.detectChanges();
    }
    activateSlack(slackdata, id) {
        slackdata.status = !slackdata.status;
        this.updateSlackList(slackdata, id);
        this._change.detectChanges();
    }
    getSlackList() {
        this.loading = true;
        this._apiService.getSlackInfo().subscribe((data) => {
            this.loading = false;
            this.slackJson = data;
            this._change.detectChanges();
        },
            (err) => {
                console.log(err);
            });
    }
    updateSlackList(refData, id) {
        this._apiService.updateSlackInfo(refData, id).subscribe((data) => {
            this.showmessage = true;
            this.message = 'Data Updated!'
            if (data) {
                this.getSlackList();
                this.showmessage = false;
            }
            this._change.detectChanges();
        },
            (err) => {
                console.log(err);
            });
    }
    deleteSlackData(id) {
        this._apiService.deleteSlackData(id).subscribe((data) => {

            this.getSlackList();
            this._change.detectChanges();
        },
            (err) => {
                console.log(err);
            });
    }
}
