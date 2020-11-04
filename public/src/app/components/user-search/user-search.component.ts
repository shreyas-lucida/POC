import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserProfile } from '../../../../shared/models/user-profile';
import { AppService, AuthService, ApiService } from '../../core/services';
import { animate, state, style, transition, trigger } from '@angular/animations';
import _ from 'lodash';
import { LoaderService } from '../providers/loaderService';
import { SharedService } from '../../shared/shared.service';

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
    ),
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)',
        zIndex: 999
      })),
      state('inactive', style({
        transform: 'rotateY(0)',
        zIndex: 2
      })),
      transition('active => inactive', animate('600ms ease-out')),
      transition('inactive => active', animate('600ms ease-in'))
    ])
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
    private sharedService: SharedService,
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
  globalSearch(value) {
    this.searchValue = value;
    this.isSearch = false
    this.search();
  }
  pocTest1(): void {
    this.loaderService.show();
    // this.apiService.testPOC().subscribe(data => {
    if (this.sharedService.excelData) {
      // let TestData =data.data['card'][0]
      let TestData = this.sharedService.excelData
      // TestData.forEach((element, i) => {
      //   if (element['ORGUNITL2'].length === 0) {
      //     element['ORGUNITL2'] = TestData[i - 1]['ORGUNITL2'];
      //   }
      //   if (element['ORGUNITL3'].length === 0) {
      //     element['ORGUNITL3'] = TestData[i - 1]['ORGUNITL3'];
      //   }
      // });
      this.users = TestData;
    } else {
      this.sharedService.readExcel()
      setTimeout(() => {
        this.pocTest1()
      }, 2000);
    }
    this.loaderService.hide();
    // });
  }

  onClickBack() {
    this.selectedItem = '';
    this.cardData.map(cardData => {
      cardData.flip = 'inactive';
      return cardData;
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

  selectedCard(input, ind) {
    this.selectedItem = input;
    this.cardData.map((cardData, i) => {
      if (i === ind) {
        cardData.flip = 'active';
      } else {
        cardData.flip = 'inactive';
      }
      return cardData;
    });
  }

  goBack() {
    this._location.back();
  }
  search() {
    let value = this.searchValue.toLowerCase()
    let filteredData = [] as any
    this.users.map((data: any) => {
      if (data['REPORTNAME'].toLowerCase().indexOf(value) !== -1 || data['DESCRIPTION'].toLowerCase().indexOf(value) !== -1 || value === '') {
        filteredData.push(data);
      }
    });
    this.cardData = filteredData;
  }

  goToLink(input) {
    console.log(input)
    if (input['REPORTLINK'].trim().length > 0) {
      window.open(input['REPORTLINK'], "_blank");
    }
  }

  seeMoreOrLess() {
    this.seeMore = !this.seeMore;
  }
}
