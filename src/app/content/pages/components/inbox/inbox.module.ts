import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule, MatCardSubtitle } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule, MatDialogModule, MatSelectModule, MatPaginatorModule, MatTableModule, MatSlideToggle, MatSlideToggleModule, MatChipsModule, MatCheckboxModule } from '@angular/material';
import { PartialsModule } from '../../../partials/partials.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { InboxComponent } from './inbox.component';
import { ViewTagMailsComponent } from './view-tag-mails/view-tag-mails.component';
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
		NgxJsonViewerModule,
		MatSlideToggleModule,
		ReactiveFormsModule,
		MatChipsModule,
		FormsModule,
		MatCardModule,
		CommonModule,
		MatCheckboxModule,
		RouterModule.forChild([
			{
				path: '',
				component:InboxComponent,
				children: [
					{
						path: ':pid/:id',
						component:ViewTagMailsComponent
					}
				]
			}
		])
	],
	providers: [],
	declarations: [
		ViewTagMailsComponent,
		InboxComponent
	]
})
export class  InboxModule { }
