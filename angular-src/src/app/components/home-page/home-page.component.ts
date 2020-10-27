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
    this.readExcelData();
    // this.getData();
  }
  readExcelData() {
    var testUrl = '../../../assets/ReportsDataSheets.xlsx';
    let jsonOut: any
    var oReq = new XMLHttpRequest();
    oReq.open("GET", testUrl, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
        //  console.log("Data"+data[i]);
      }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      //console.log("Data"+bstr);
      var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(first_sheet_name);

      var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1, raw: true });
      jsonOut = JSON.stringify(json);
    }
    console.log(jsonOut);
    oReq.send();
    setTimeout(() => {
      this.sharedService.excelData = jsonOut

      this.getData();
    }, 2000);
  }

  getData(): void {
    this.loaderService.show();
    // this.apiService.testPOC().subscribe(data => {
    if (this.sharedService.excelData) {
      let dataFromSheet = JSON.parse(this.sharedService.excelData);
      console.log(dataFromSheet);

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
    // });
  }

  goToReports(input, name) {
    sessionStorage.setItem('cat', input);
    sessionStorage.setItem('cat_name', name);
    this.router.navigateByUrl('/category');
  }
}
