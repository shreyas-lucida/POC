import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserProfile } from '../../../../../shared/models/user-profile';
import { AppService, AuthService, ApiService } from '../../core/services';
import { animate, style, transition, trigger } from '@angular/animations';
import _ from 'lodash';
import { LoaderService } from '../providers/loaderService';

@Component({
  selector: 'app-user-search',
  animations: [
    trigger(
      'myAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 1 }),
        animate('250ms', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', 'opacity': 1 }),
        animate('250ms', style({ transform: 'translateY(100%)', opacity: 1 }))
      ])
    ],
    )
  ],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  isSearch: boolean = true;
  users: any[];
  cardData: any[];
  showDescription = false;
  selectedItem: any;
  searchValue = '';
  seeMore: boolean;
  selectedSubCat = '';
  selectedCat = '';

  constructor(
    private router: Router,
    private appService: AppService,
    private toastService: ToastrService,
    private authService: AuthService,
    private apiService: ApiService,
    private _location: Location,
    private loaderService: LoaderService

  ) {
    this.selectedSubCat = sessionStorage.getItem('subCat');
    this.selectedCat = sessionStorage.getItem('cat');
  }

  get user(): UserProfile {
    return this.appService.user;
  }
  ngOnInit() {
    this.pocTest1();
  }
  globalSearch(value){
    this.searchValue = value;
    this.isSearch = false
    this.search();
  }
  pocTest1(): void {
    this.loaderService.show();
    this.apiService.testPOC().subscribe(data => {
      if (data.status === 'ok') {
        let TestData =data.data['card'][2]
        TestData.forEach((element, i) => {
          if (element.category.length === 0) {
            element.category = TestData[i - 1]['category'];
          }
          if (element.subcategory.length === 0) {
            element.subcategory = TestData[i - 1]['subcategory'];
          }
        });
        this.users = TestData;
      }
      this.loaderService.hide();
    });
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/');
      this.toastService.success(
        `You are logged out`,
        `You have succesfully logged out!`
      );
    });
  }

  selectedCard(input) {
    this.selectedItem = input;
  }

  goBack() {
    this._location.back();
  }
  search() {
    let value = this.searchValue.toLowerCase()
    let filteredData = [] as any
    this.users.map((data: any) => {
      if (data.reportsname.toLowerCase().indexOf(value) !== -1 || data.reportsdescription.toLowerCase().indexOf(value) !== -1 || value === '') {
        filteredData.push(data);
      }
    });
    this.cardData = filteredData;
  }
  seeMoreOrLess() {
    this.seeMore = !this.seeMore;
  }
}
