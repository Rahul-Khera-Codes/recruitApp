import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { ImapServerComponent } from './imap-server/imap-server.component';
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: SettingsComponent,
				children: [
					{
						path: 'imap',
						component: ImapServerComponent
					}
				]
			}
		])
	],
	providers: [],
	declarations: [
		SettingsComponent,
		ImapServerComponent
	]
})
export class SettingsModule { }
