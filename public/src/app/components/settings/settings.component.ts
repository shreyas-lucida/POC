import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { LoaderService } from '../providers/loaderService';
const uploadURL = '../../../assets/excel';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-user-search',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class settingsComponent implements OnInit {
  worksheet: any;
  refrencesheet: any;
  refrenceData: any;
  excelData: any;
  uploadedFileToSend: any;
  isAdmin = false;
  constructor(
    private _location: Location,
    private sharedService: SharedService,
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
    private loaderService: LoaderService,
    private _msalService: MsalService
  ) { this.getAuthDetails(); }
  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }

  getAuthDetails() {
    const account = (this._msalService.getAccount().idToken as any).roles;
    let isAdmin = account.find(element => element === "Admin")
    if (isAdmin === "Admin") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

  }

  uploadedFile(event) {
    let jsonData: any;
    let refrenceJsonData: any;
    let fileUploaded = event.target.files[0];
    this.uploadedFileToSend = event.target.files[0];
    let readFile = new FileReader();
    let storeData: any;
    readFile.onload = (e) => {
      storeData = readFile.result;
      var data = new Uint8Array(storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });

      var first_sheet_name = workbook.SheetNames[0];
      var refrence_sheet_name = workbook.SheetNames[1];

      this.refrencesheet = workbook.Sheets[refrence_sheet_name];
      this.worksheet = workbook.Sheets[first_sheet_name];

      var worksheet = workbook.Sheets[first_sheet_name];
      var refrencesheet = workbook.Sheets[refrence_sheet_name]

      jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      refrenceJsonData = XLSX.utils.sheet_to_json(refrencesheet, { raw: false });

      jsonData.map((object: any) => {
        Object.keys(object).forEach(function (key) { var newKey = key.replace(/\s+/g, ''); if (object[key] && typeof object[key] === 'object') { this.replaceKeys(object[key]); } if (key !== newKey) { object[newKey] = object[key]; delete object[key]; } });
        return data;
      })

      refrenceJsonData.map((object: any) => {
        Object.keys(object).forEach(function (key) { var newKey = key.replace(/\s+/g, ''); if (object[key] && typeof object[key] === 'object') { this.replaceKeys(object[key]); } if (key !== newKey) { object[newKey] = object[key]; delete object[key]; } });
        return data;
      })
      setTimeout(() => {
        this.excelData = jsonData;
        this.refrenceData = refrenceJsonData;
      }, 2000);
    }
    readFile.readAsArrayBuffer(fileUploaded);
  }
  readAsJson() {
    if (this.uploadedFileToSend) {
      this.loaderService.show();

      setTimeout(() => {
        const formData = new FormData();
        formData.append('file', this.uploadedFileToSend);
        this.apiService.uploadFile(formData).subscribe(data => {
        });
        this.sharedService.excelData = this.excelData;
        this.sharedService.refrenceData = this.refrenceData;
        this.router.navigateByUrl('/home');
      }, 3000);
      this.loaderService.hide();

    }
  }
}
