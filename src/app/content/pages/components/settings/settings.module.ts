import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
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
import {
	MatProgressSpinnerModule,
	MatDialogModule,
	MatSelectModule,
	MatPaginatorModule,
	MatTableModule,
	MatSlideToggle,
	MatSlideToggleModule,
	MatChipsModule,
	MatGridListModule,
	MatListModule,
	MatMenuModule
} from '@angular/material';
import { PartialsModule } from '../../../partials/partials.module';
import { ManualTagComponent } from './tag-setting/modal/manual-tag/manual-tag.component';
import { UserListComponent } from './user-list/user-list.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { ConfirmationDialogComponent } from './model/confirmation-dialog.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { AutoMaticTagComponent } from './auto-matic-tag/auto-matic-tag.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { UserActivityLogComponent } from './user-activity-log/user-activity-log.component';
import { RemoveOldLogsComponent } from './remove-old-logs/remove-old-logs.component';
import { EmailLogsComponent } from './email-logs/email-logs.component';
import { SetvaremailpreviewComponent } from './setVarEmailPreview/setVarEmailPreview.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
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
		MatGridListModule,
		MatMenuModule,
		MatListModule,
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
						path: 'user-list',
						component: UserListComponent
					},
					{
						path: 'job-profile',
						component: JobProfileComponent
					},
					{
						path: 'add-tag',
						component: AddTagComponent
					},
					{
						path: 'auto-matic-tag',
						component: AutoMaticTagComponent
					},
					{
						path: 'add-user',
						component: AddNewUserComponent
					},
					{
						path: 'company-profile',
						component: CompanyProfileComponent
					},
					{
						path: 'user-activity-log',
						component: UserActivityLogComponent
					},
					{
						path: 'email-logs',
						component: EmailLogsComponent
					},
					{
						path: 'reset-password',
						component: ResetPasswordComponent
					}

				]
			}
		])
	],
	providers: [],
	entryComponents: [
		ManualTagComponent,
		ConfirmationDialogComponent,
		RemoveOldLogsComponent,
		SetvaremailpreviewComponent
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
		UserListComponent,
		JobProfileComponent,
		AutoMaticTagComponent,
		ConfirmationDialogComponent,
		AddTagComponent,
		AddNewUserComponent,
		CompanyProfileComponent,
		UserActivityLogComponent,
		RemoveOldLogsComponent,
		EmailLogsComponent,
		SetvaremailpreviewComponent,
		ResetPasswordComponent
	]
})
export class SettingsModule { }
