import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LoaderService } from '../providers/loaderService';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit {
  selectedTab = '1';
  cardData: any[];
  selectedCardData: any;
  displayHeading = '';
  selectedData;
  selectedCardData1: any;
  constructor(private _location: Location,
    private router: Router,
    private apiService: ApiService,
    private loaderService: LoaderService) {
  }
  ngOnInit(): void {
    this.pocTest();
    this.apiService.getCategory().subscribe((res) => {
      // console.log('res', res)
      this.selectedData = res;
    })
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
          arrSub.forEach(subcat => {
            if (cat.category === subcat.category) {
              cat['children'].push(subcat);
            }
          });
          firstLevelStack.push(cat);
        });
        this.cardData = firstLevelStack;
        this.selectedItem(0, this.selectedData);
      }
      this.loaderService.hide();
    });
  }

  selectedItem(input, category) {
    this.selectedCardData1 = this.cardData[input]['children'];
    this.selectedData = category;
    let data = this.cardData.find((res) => {
      return res.category === category;
    })
    this.selectedCardData = data['children']
    this.displayHeading = data['category'];
    // console.log('data', data)
    this.selectedTab = input;
    sessionStorage.setItem('cat', input);
    // console.log('selecteddata', this.selectedCardData)
    // console.log('this.selectedCardData1', this.selectedCardData1)
    // this.displayHeading = this.cardData[input]['category'];
  }

  goToReports(input) {
    this.router.navigateByUrl('/reports');
    sessionStorage.setItem('subCat', this.selectedCardData1[input]['subcategory']);

  }

  goBack() {
    this._location.back();
  }
}
