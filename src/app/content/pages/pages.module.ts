import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PartialsModule } from '../partials/partials.module';
import { ActionComponent } from './header/action/action.component';
import { ProfileComponent } from './header/profile/profile.component';
import { MailModule } from './components/apps/mail/mail.module';
import { ECommerceModule } from './components/apps/e-commerce/e-commerce.module';
import { CoreModule } from '../../core/core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { SettingsModule } from './components/settings/settings.module';
import { InboxComponent } from './components/inbox/inbox.component';
import { InboxModule } from './components/inbox/inbox.module';
@NgModule({
	declarations: [
		PagesComponent,
		ActionComponent,
		ProfileComponent,
		ErrorPageComponent,
		// InboxComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PagesRoutingModule,
		CoreModule,
		LayoutModule,
		PartialsModule,
		MailModule,
		ECommerceModule,
		AngularEditorModule,
		SettingsModule,
		InboxModule
	],
	providers: []
})
export class PagesModule { }
