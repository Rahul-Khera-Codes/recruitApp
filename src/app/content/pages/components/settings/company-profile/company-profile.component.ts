import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../../../core/services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'm-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  companyProfileForm: FormGroup;
  previousContent: any;
  loading = true;
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private snackbar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getCompanyProfile();
  }

  async getCompanyProfile() {
    try {
      this.previousContent = await this._apiService.getCompanyProfile();
      this.loading = false;
      if (!this.previousContent) {
        this.createForm();
      } else {
        this.updateForm(this.previousContent);
      }
    } catch (e) {
      this.createForm();
      this.loading = false;
    }
  }

  createForm() {
    this.companyProfileForm = this.fb.group({
      'company_profile': null
    });
    this.changeDetectorRef.detectChanges();
  }


  updateForm(formData) {
    this.companyProfileForm = this.fb.group({
      'company_profile': formData['company_profile'],
    });
    this.changeDetectorRef.detectChanges();
  }

  async companyProfile(formData) {
    if (!this.previousContent) {
      const res = await this._apiService.addCompanyProfile(formData);
      this.snackbar.open('Company Profile Added', '', {
        duration: 2000
      });
      this.getCompanyProfile();
    } else {
      const res = await this._apiService.updateCompanyProfile(this.previousContent['id'], formData);
      this.previousContent['company_profile'] = formData['company_profile'];
      this.snackbar.open('Company Profile Updated', '', {
        duration: 2000
      });
    }
  }
}
