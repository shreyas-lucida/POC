import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LoaderService } from '../providers/loaderService';
import * as XLSX from 'xlsx';
import { SharedService } from '../../shared/shared.service';
import { MsalService } from '@azure/msal-angular';

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
    private loaderService: LoaderService,
    private _msalService: MsalService) {
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
    if (this.sharedService.refrenceData) {
      let dataFromSheet = this.sharedService.refrenceData;
      let arr = [];
      dataFromSheet.forEach(element => {
        if (element['ORGUNITL2'] && element['L2Description']) {
          arr.push(element);
        }
      });
      this.cardData = arr;
    } else {
      this.sharedService.readExcel();
      setTimeout(() => {
        this.getData();
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
