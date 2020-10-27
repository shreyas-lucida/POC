import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';
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
    // jsonData = JSON.stringify(jsonData);
    jsonData.map((object: any) => {
      Object.keys(object).forEach(function (key) { var newKey = key.replace(/\s+/g, ''); if (object[key] && typeof object[key] === 'object') { this.replaceKeys(object[key]); } if (key !== newKey) { object[newKey] = object[key]; delete object[key]; } });
      return data;
    })
    this.sharedService.excelData =jsonData;
    const data: Blob = new Blob([jsonData], { type: "application/vnd.ms-excel;charset=utf-8" });  
    // FileSaver.saveAs(data, 'ReportDataSheet.xls');    
  }
}
