import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { UserProfile } from '../../../../../shared/models/user-profile';
import { AppService, AuthService, ApiService } from '../../core/services';
import { animate, style, transition, trigger } from '@angular/animations';
import _ from 'lodash';
import { LoaderService } from '../providers/loaderService';

@Component({
  selector: 'app-user-page',
  animations: [
    trigger(
      'myAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 1}),
          animate('250ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', 'opacity': 1}),
          animate('250ms', style({transform: 'translateY(100%)', opacity: 1}))
        ])
      ],
    )
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
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
    private route: ActivatedRoute,
    private loaderService: LoaderService

  ) {
    this.selectedSubCat = sessionStorage.getItem('subCat');
    this.selectedCat = sessionStorage.getItem('cat');

  }

  get user(): UserProfile {
    return this.appService.user;
  }
  ngOnInit() {
    this.route.params.subscribe(params =>
      this.searchValue = params.search ? params.search : ''
    );
    this.pocTest1();
  }

  pocTest1(): void {
    this.loaderService.show();
    this.apiService.testPOC().subscribe(data => {
      if (data.status === 'ok') {
        // this.cardData = data.data['card'][1];
        let TestData = data.data['card'][2];
        let arr = [];
        let arrSub = [];
        TestData.forEach((element, i) => {
          if (element.category.length === 0) {
            element.category = TestData[i - 1]['category'];
          } else {
            arr.push(element);
          }
          if (element.categorydescription.length === 0) {
            element.categorydescription = TestData[i - 1]['categorydescription'];
          }
          if (element.categorytype.length === 0) {
            element.categorytype = TestData[i - 1]['categorytype'];
          }
          if (element.subcategory.length === 0) {
            element.subcategory = TestData[i - 1]['subcategory'];
          } else {
            arrSub.push(element);
          }
          if (element.subcategorydescription.length === 0) {
            element.subcategorydescription = TestData[i - 1]['subcategorydescription'];
          }
          if (element.subcategorytype.length === 0) {
            element.subcategorytype = TestData[i - 1]['subcategorytype'];
          }
        });
        let firstLevelStack = [];
        let secondLevelStack = [];
        arr.forEach(cat => {
          cat['children'] = [];
          arrSub.forEach(subcat => {
            if (cat.category === subcat.category) {
              cat['children'].push(subcat);
            }
          });
          firstLevelStack.push(cat);
        });
        firstLevelStack.forEach(element => {
          element['children'].forEach(element1 => {
            element1['subchildren'] = [];
            TestData.forEach(element2 => {
              if (element1['subcategory'] === element2['subcategory'] && element1['category'] === element2['category']) {
                element['subchildren'].push(element2);
              }
            });
          });
          secondLevelStack.push(element);
        });
        var grouped = _.mapValues(_.groupBy(secondLevelStack[this.selectedCat]['subchildren'], 'subcategory'),
          clist => clist.map(car => _.omit(car, 'subcategory')));
        this.cardData = grouped[this.selectedSubCat];
        this.users = this.cardData;
        this.search()
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
    console.log(this.searchValue);

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
