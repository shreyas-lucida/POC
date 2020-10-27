import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient
  ) { }

  // readExcel() {
  //   console.log('call');
  //   this.http.get('../../assets/excel/ReportsDataSheets.xlsx')
  //   .subscribe(
  //       data => {
  //           console.log(data);
  //       },
  //       error => {
  //           console.log(error);
  //       }
  //   );
  // }
}
