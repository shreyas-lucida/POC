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
    this.getData();
    sessionStorage.removeItem("cat");
    sessionStorage.removeItem("subCat");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("result");

  }

  getData(): void {
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
        this.cardData = dataFromSheet;
        console.log(this.cardData)
      }
      this.loaderService.hide();
    });
  }

  goToReports(input, name) {
    sessionStorage.setItem('cat', input);
    sessionStorage.setItem('cat_name', name);
    this.router.navigateByUrl('/category');
  }
}
