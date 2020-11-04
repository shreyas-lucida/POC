import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  excelData: any;
  refrenceData: any;
  constructor(private http: HttpClient) {
  }

  setExcelFile(jsonData: any) {
    this.excelData = jsonData;
  }

  setRefrenceFile(jsonData: any) {
    this.refrenceData = jsonData;
  }

  readExcel() {
    var testUrl = environment.readFileUrl;

    let jsonData: any;
    let refrenceJsonData: any;
    var oReq = new XMLHttpRequest();
    oReq.open("GET", testUrl, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
      var arraybuffer = oReq.response;
      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var refrence_sheet_name = workbook.SheetNames[1];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var refrencesheet = workbook.Sheets[refrence_sheet_name];

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
    }
    oReq.send();
    setTimeout(() => {
      this.excelData = jsonData;
      this.refrenceData = refrenceJsonData;
    }, 2000);
  }
}