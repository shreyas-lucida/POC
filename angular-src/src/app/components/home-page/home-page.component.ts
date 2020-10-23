import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LoaderService } from '../providers/loaderService';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  selectedTab = '1';
  cardData: any[];
  constructor(private _location: Location,
    private router: Router,
    private apiService: ApiService,
    private loaderService: LoaderService) {
  }
  ngOnInit(): void {
    this.pocTest();
    sessionStorage.removeItem("cat");
    sessionStorage.removeItem("subCat");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("result");

  }

  pocTest(): void {
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
        arr.forEach(cat => {
          cat['children'] = [];
          TestData.forEach(subcat => {
            if (cat.category === subcat.category) {
              cat['children'].push(subcat);
            }
          });
          firstLevelStack.push(cat);
        });
        this.cardData = firstLevelStack;
      }
        this.loaderService.hide();
    });
  }

  goToReports(value) {
    this.apiService.setCategory(value);
    this.router.navigateByUrl('/category');
  }

  goBack() {
    this._location.back();
  }
}
