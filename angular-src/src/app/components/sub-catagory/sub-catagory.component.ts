import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LoaderService } from '../providers/loaderService';

@Component({
  selector: 'app-sub-catagory',
  templateUrl: './sub-catagory.component.html',
  styleUrls: ['./sub-catagory.component.scss'],
})
export class SubcatagoryComponent implements OnInit {
  selectedTab = '1';
  cardData: any[];
  selectedCardData: any;
  displayHeading = '';
  selectedData;
  selectedCardData1: any;
  selectedCat: any;
  constructor(private _location: Location,
    private router: Router,
    private apiService: ApiService,
    private loaderService: LoaderService) {
    this.selectedCat = sessionStorage.getItem('cat');

  }
  ngOnInit(): void {
    this.pocTest();
  }

  pocTest(): void {
    this.loaderService.show();
    this.apiService.testPOC().subscribe(data => {
      if (data.status === 'ok') {
        let dataFromSheet = data.data['card'][0];
        let obj = {};
        for (let i = 0, len = dataFromSheet.length; i < len; i++)
          obj[dataFromSheet[i]['category']] = dataFromSheet[i];

        dataFromSheet = new Array();
        for (let key in obj)
          dataFromSheet.push(obj[key]);

        let dataFromSheet1 = data.data['card'][0];
        let obj1 = {};
        for (let j = 0, len = dataFromSheet1.length; j < len; j++) {
          obj1[dataFromSheet1[j]['subcategory']] = dataFromSheet1[j];
        }

        dataFromSheet1 = new Array();
        for (let key1 in obj1) {
          dataFromSheet1.push(obj1[key1]);
        }
        let firstLevelStack = [];
        dataFromSheet.forEach(cat => {
          let arr = [];
          dataFromSheet1.forEach(subcat => {
            if (cat['category'] === subcat['category']) {
              arr.push(subcat);
            } else {
              if (cat['subcategory'] === subcat['subcategory']) {
                arr.push(cat);
              }
            }
          });
          cat['children'] = arr;

          firstLevelStack.push(cat);
        });
        this.cardData = firstLevelStack;
        let cat = sessionStorage.getItem('cat');
        this.selectedItem(cat, '');
      }
      this.loaderService.hide();
    });
  }

  selectedItem(input, name) {
    this.displayHeading = this.cardData[input]['category'];
    this.selectedCardData = this.cardData[input]['children'];
    this.selectedTab = input;
    sessionStorage.setItem('cat', input);
    if (name.length > 0) {
      sessionStorage.setItem('cat_name', name);
    }
  }

  goToReports(input) {
    this.router.navigateByUrl('/reports');
    sessionStorage.setItem('subCat', this.selectedCardData[input]['subcategory']);
  }

  goBack() {
    this._location.back();
  }
}
