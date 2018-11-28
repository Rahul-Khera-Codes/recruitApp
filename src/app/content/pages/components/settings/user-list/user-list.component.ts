import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DialogService } from '../../../../../core/services/dialog.service';

@Component({
  selector: 'm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  page = 1;
  limit = 100;
  userList: Array<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  displayedColumns = [
    'Sr. No',
    'email',
    'user_type',
    'Action',
  ];
  loading = true;
  constructor(
    public _apiService: ApiService,
    private _dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getUserList();
    this.paginator.page.subscribe(() => {
      this.getUserList();
    });
  }

  async getUserList() {
    try {
      const res = await this._apiService.getUserList({ 'page': this.page, limit: this.limit });
      this.userList = res['data'];
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }



  addUser() {
    // this._dialogService.openAddUser().then((res: any) => {
    //   if (res) {
    //     this.userList.unshift(res);
    //     this.getUserList();
    //   }
    // }, (err) => {
    //   console.log(err);
    // });
  }

  async deleteUser(userData) {
    this._dialogService.openConfirmationBox('Are you sure ?').then(async res => {
      if (res === 'yes') {
        try {
          await this._apiService.deleteUser(userData.id);
          this.getUserList();
        } catch (e) {
          console.log(e);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }
}
