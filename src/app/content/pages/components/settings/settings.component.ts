import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutConfigService } from '../../../../core/services/layout-config.service';
import { SubheaderService } from '../../../../core/services/layout/subheader.service';

@Component({
	selector: 'm-settings',
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

	public config: any;

	constructor(
	) {
	}

	ngOnInit(): void {}
}
