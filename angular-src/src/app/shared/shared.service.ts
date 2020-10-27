import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  excelData: any;
  constructor(
    private http: HttpClient
  ) { }

  setExcelFile(jsonData: any) {
    this.excelData = jsonData;
    console.log(this.excelData);

  }

  // readExcel() {
  //   console.log('call');
  //   this.http.get('../../assets/excel/ReportsDataSheets.xlsx')
  //     .subscribe(
  //       data => {
  //         // let readFile = new FileReader();  
  //         // readFile.onload = (e) => {  
  //         //   this.storeData = readFile.result;  
  //         //   var data = new Uint8Array(this.storeData);  
  //         //   var arr = new Array();  
  //         //   for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);  
  //         //   var bstr = arr.join("");  
  //         //   var workbook = XLSX.read(bstr, { type: "binary" });  
  //         //   var first_sheet_name = workbook.SheetNames[0];  
  //         //   this.worksheet = workbook.Sheets[first_sheet_name];  
  //         // }  
  //         // readFile.readAsArrayBuffer(this.fileUploaded);
  //         console.log(data);

  //       }
  //     );
  // }
}
