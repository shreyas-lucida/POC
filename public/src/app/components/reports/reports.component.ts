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
  selector: 'app-reports',
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
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  users: any[];
  cardData: any[];
  showDescription = false;
  selectedItem: any;
  searchValue = '';
  seeMore: boolean;
  selectedSubCat = '';
  selectedCat = '';
  selectedCatName = '';

  constructor(
    private router: Router,
    private appService: AppService,
    private toastService: ToastrService,
    private authService: AuthService,
    private apiService: ApiService,
    private sharedService: SharedService,
    private _location: Location,
    private loaderService: LoaderService

  ) {
    this.selectedSubCat = sessionStorage.getItem('subCat');
    this.selectedCat = sessionStorage.getItem('cat');
    this.selectedCatName = sessionStorage.getItem('cat_name');


  }

  get user(): UserProfile {
    return this.appService.user;
  }
  ngOnInit() {
    this.pocTest1();
  }

  groupBy(array, f) {
    var groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    })
  }



  pocTest1(): void {
    this.loaderService.show();
    // this.apiService.testPOC().subscribe(data => {
    if (this.sharedService.excelData) {
      // let dataFromSheet = data.data['card'][0];
      let dataFromSheet = this.sharedService.excelData;

      let result = this.groupBy(dataFromSheet, function (item) {
        return [item['ORGUNITL2'], item['ORGUNITL3']];
      });
      result.forEach(element => {
        if (element[0]['ORGUNITL2'] === this.selectedCatName && element[0]['ORGUNITL3'] === this.selectedSubCat) {
          this.cardData = element;
        }
      });
      this.users = this.cardData;
      if (this.cardData && this.cardData.length > 0) {
        this.search();
      }
    } else {
      this.sharedService.readExcel()
      setTimeout(() => {
        this.pocTest1()
      }, 2000);
    }
    this.loaderService.hide();
    // });
  }

  goToLink(input) {
    if (input['REPORTLINK'].trim().length > 0) {
      window.open(input['REPORTLINK'], "_blank");
    }
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
  seeMoreOrLess() {
    this.seeMore = !this.seeMore;
  }
}
