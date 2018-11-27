import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { SettingsComponent } from './settings.component';
import { ImapServerComponent } from './imap-server/imap-server.component';
import { MatCardModule, MatCardSubtitle } from '@angular/material/card';
import { ImapComponentFormComponent } from './imap-component-form/imap-component-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SmtpServerComponent } from './smtp-server/smtp-server.component'
import { SmtpComponentFormComponent } from './smtp-component-form/smtp-component-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { SlackInfoComponent } from './slack-info/slack-info.component';
import { SlackComponentFormComponent } from './slack-component-form/slack-component-form.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component'
import { TagSettingComponent } from './tag-setting/tag-setting.component';
import { MatProgressSpinnerModule, MatDialogModule, MatSelectModule, MatPaginatorModule, MatTableModule, MatSlideToggle, MatSlideToggleModule, MatChipsModule } from '@angular/material';
import { PartialsModule } from '../../../partials/partials.module';
import { ManualTagComponent } from './tag-setting/modal/manual-tag/manual-tag.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { ConfirmationDialogComponent } from './model/confirmation-dialog.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { AutoMaticTagComponent } from './auto-matic-tag/auto-matic-tag.component';
@NgModule({
	imports: [

		MatIconModule,
		MatCardModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatInputModule,
		MatRadioModule,
		MatButtonModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		PartialsModule,
		MatTableModule,
		MatPaginatorModule,
		MatSelectModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatSlideToggleModule,
		ReactiveFormsModule,
		MatChipsModule,
		FormsModule,
		MatCardModule,
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: SettingsComponent,
				children: [
					{
						path: 'imap',
						component: ImapServerComponent
					}, {
						path: 'smtp',
						component: SmtpServerComponent
					}, {
						path: 'slackInfo',
						component: SlackInfoComponent
					}, {
						path: 'emailTemplate',
						component: EmailTemplatesComponent
					},
					{
						path: 'tag-setting',
						component: TagSettingComponent
					},
					{
						path: 'job-profile',
						component: JobProfileComponent
					},
					{
						path: 'add-tag',
						component:AddTagComponent
					},
					{
						path: 'auto-matic-tag',
						component:AutoMaticTagComponent
					}

				]
			}
		])
	],
	providers: [],
	entryComponents: [
		ManualTagComponent,
		ConfirmationDialogComponent
	],
	declarations: [
		ImapComponentFormComponent,
		SettingsComponent,
		ImapServerComponent,
		SmtpServerComponent,
		SmtpComponentFormComponent,
		SlackInfoComponent,
		SlackComponentFormComponent,
		EmailTemplatesComponent,
		TagSettingComponent,
		AddTagComponent,
		ManualTagComponent,
		JobProfileComponent,
		AutoMaticTagComponent,
		ConfirmationDialogComponent,
		AddTagComponent
	]
})
export class SettingsModule { }
