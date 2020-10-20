import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit {
  selectedTab = '1';
  cardData: any[];
  selectedCardData: any;
  constructor(private _location: Location,
    private router: Router,
    private apiService: ApiService) {
  }
  ngOnInit(): void {
    this.pocTest();
  }

  pocTest(): void {
    this.apiService.testPOC().subscribe(data => {
      if (data.status === 'ok') {
        this.cardData = data.data['card'][1];
        console.log(this.cardData);
        this.selectedItem('1');
      }
    })
  };

  selectedItem(input) {
    if (input) {
      this.selectedCardData = this.cardData[input].subcategory.split(',');
     console.log(this.selectedCardData)
    }
    this.selectedTab = input;
  }

  goToReports() {
    this.router.navigateByUrl('/user');
  }

  goBack() {
    this._location.back();
  }
}
