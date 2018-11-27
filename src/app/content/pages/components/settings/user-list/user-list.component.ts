import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

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
    public _apiService: ApiService
  ) { }

  ngOnInit() {
    this.Math = Math;
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

  deleteUser(userData) {
    // this._dialogService.openConfirmationBox('Are you sure ?').then((res) => {
    //   if (res === 'yes') {
    //     _.pull(this.userList, userData);
    //     this._imapMailsService.deleteUser('user/delete/', userData.id).subscribe((deleteData) => {
    //       this.getUserList();
    //     }, (err) => {
    //       console.log(err);
    //     });
    //   }
    // }, (err) => {
    //   console.log(err);
    // });
  }
}
