import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LoaderService } from '../providers/loaderService';
import { SharedService } from '../../shared/shared.service';

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
    private sharedService: SharedService,
    private loaderService: LoaderService) {
    this.selectedCat = sessionStorage.getItem('cat');

  }
  ngOnInit(): void {
    this.pocTest();
  }

  pocTest(): void {
    this.loaderService.show();
    // this.apiService.testPOC().subscribe(data => {
      if (this.sharedService.excelData) {
        // let dataFromSheet = data.data['card'][0];
        let dataFromSheet = this.sharedService.excelData;
        let obj = {};
        for (let i = 0, len = dataFromSheet.length; i < len; i++)
          obj[dataFromSheet[i]['Category']] = dataFromSheet[i];

        dataFromSheet = new Array();
        for (let key in obj)
          dataFromSheet.push(obj[key]);

        let dataFromSheet1 = this.sharedService.excelData;
        let obj1 = {};
        for (let j = 0, len = dataFromSheet1.length; j < len; j++) {
          obj1[dataFromSheet1[j]['SubCategory']] = dataFromSheet1[j];
        }

        dataFromSheet1 = new Array();
        for (let key1 in obj1) {
          dataFromSheet1.push(obj1[key1]);
        }
        let firstLevelStack = [];
        dataFromSheet.forEach(cat => {
          let arr = [];
          dataFromSheet1.forEach(subcat => {
            if (cat['Category'] === subcat['Category']) {
              arr.push(subcat);
            } else {
              if (cat['SubCategory'] === subcat['SubCategory']) {
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
      } else {
        this.sharedService.readExcel()
        setTimeout(() => {
          this.pocTest()
        }, 2000);
      }
      this.loaderService.hide();
    // });
  }

  selectedItem(input, name) {
    this.displayHeading = this.cardData[input]['Category'];
    this.selectedCardData = this.cardData[input]['children'];
    this.selectedTab = input;
    sessionStorage.setItem('cat', input);
    if (name.length > 0) {
      sessionStorage.setItem('cat_name', name);
    }
  }

  goToReports(input) {
    this.router.navigateByUrl('/reports');
    sessionStorage.setItem('subCat', this.selectedCardData[input]['SubCategory']);
  }

  goBack() {
    this._location.back();
  }
}
