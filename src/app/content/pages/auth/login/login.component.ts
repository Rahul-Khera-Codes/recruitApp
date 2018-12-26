import {
	Component,
	OnInit,
	Output,
	Input,
	ViewChild,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	HostBinding
} from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthNoticeService } from '../../../../core/auth/auth-notice.service';
import { NgForm } from '@angular/forms';
import * as objectPath from 'object-path';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerButtonOptions } from '../../../partials/content/general/spinner-button/button-options.interface';

@Component({
	selector: 'm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
	public model: any = { email: '123@gmail.com', password: '123' };
	@HostBinding('class') classes: string = 'm-login__signin';
	@Output() actionChange = new Subject<string>();
	public loading = false;

	@Input() action: string;

	@ViewChild('f') f: NgForm;
	errors: any = [];

	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};

	constructor(
		private authService: AuthenticationService,
		private router: Router,
		public authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private cdr: ChangeDetectorRef
	) { }

	async submit() {
		this.spinner.active = true;
		console.log(this.validate(this.f))
		if (this.validate(this.f)) {
			try {
				const response = await this.authService.login(this.model).toPromise();
				console.log(response,typeof response !== 'undefined')
				if (typeof response !== 'undefined') {
					this.router.navigate(['/']);
				}
				this.spinner.active = false;
				this.cdr.detectChanges();
			} catch (e) {
				this.spinner.active = false;
				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'error');
				this.cdr.detectChanges();
				console.log(e);
			}
		}
	}

	ngOnInit(): void {
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Use your account details to continue.`;
			this.authNoticeService.setNotice(initialNotice, 'success');
		}
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
	}

	validate(f: NgForm) {
		if (f.form.status === 'VALID') {
			return true;
		}

		this.errors = [];
		if (objectPath.get(f, 'form.controls.email.errors.email')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', { name: this.translate.instant('AUTH.INPUT.EMAIL') }));
		}
		if (objectPath.get(f, 'form.controls.email.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.REQUIRED', { name: this.translate.instant('AUTH.INPUT.EMAIL') }));
		}

		if (objectPath.get(f, 'form.controls.password.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', { name: this.translate.instant('AUTH.INPUT.PASSWORD') }));
		}
		// if (objectPath.get(f, 'form.controls.password.errors.minlength')) {
		// 	this.errors.push(this.translate.instant('AUTH.VALIDATION.MIN_LENGTH', {name: this.translate.instant('AUTH.INPUT.PASSWORD')}));
		// }
		if (this.errors.length > 0) {
			this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
			this.spinner.active = false;
		}

		return false;
	}

	forgotPasswordPage(event: Event) {
		this.action = 'forgot-password';
		this.actionChange.next(this.action);
	}

	register(event: Event) {
		this.action = 'register';
		this.actionChange.next(this.action);
	}
}
