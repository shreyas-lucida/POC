import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LoaderService } from '../providers/loaderService';
import * as XLSX from 'xlsx';
import { SharedService } from '../../shared/shared.service';

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
    private sharedService: SharedService,
    private loaderService: LoaderService) {
  }
  ngOnInit(): void {
    sessionStorage.removeItem("cat");
    sessionStorage.removeItem("subCat");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("result");
    this.getData();
  }
  getData(): void {
    this.loaderService.show();
    // this.apiService.testPOC().subscribe(data => {
    if (this.sharedService.excelData) {
      let dataFromSheet = this.sharedService.excelData;
      let obj = {};
      for (let i = 0, len = dataFromSheet.length; i < len; i++)
        obj[dataFromSheet[i]['Category']] = dataFromSheet[i];

      dataFromSheet = new Array();
      for (let key in obj)
        dataFromSheet.push(obj[key]);
      this.cardData = dataFromSheet;
    } else {
      this.sharedService.readExcel()
      setTimeout(() => {
        this.getData()
      }, 2000);
    }
    this.loaderService.hide();
    // });
  }

  goToReports(input, name) {
    sessionStorage.setItem('cat', input);
    sessionStorage.setItem('cat_name', name);
    this.router.navigateByUrl('/category');
  }
}
