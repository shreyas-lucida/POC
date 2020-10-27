import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AppService, AuthService, ApiService } from '../../core/services';
import * as XLSX from 'xlsx';
import { LoaderService } from '../providers/loaderService';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class settingsComponent implements OnInit {
  worksheet: any;
  constructor(
    private _location: Location,
    private sharedService: SharedService
  ) { }
  ngOnInit() {
   
   }

  goBack() {
    this._location.back();
  }

  uploadedFile(event) {
    let fileUploaded = event.target.files[0];
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
      this.worksheet = workbook.Sheets[first_sheet_name];
    }
    readFile.readAsArrayBuffer(fileUploaded);
  }
  readAsJson() {
    let jsonData: any;
    jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    jsonData = JSON.stringify(jsonData);
    this.sharedService.setExcelFile(jsonData);
    // const data: Blob = new Blob([this.jsonData], { type: "application/json" });  
  }
}
