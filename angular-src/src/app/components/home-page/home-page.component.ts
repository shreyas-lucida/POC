import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

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
    private apiService: ApiService) {
  }
  ngOnInit(): void {
    this.selectedItem('1');
    this.pocTest();
  }

  pocTest(): void {
    this.apiService.testPOC().subscribe(data => {
      if (data.status === 'ok') {
        this.cardData = data.data['card'][1];
        console.log(this.cardData);
      }
    })
  };

  selectedItem(input) {
    if (input === '1') {
      this.cardData = [
        {
          name: 'C & I Customers',
          type: 'Connections & Billing'
        },
        {
          name: 'Customer Channel & Marketing',
          type: 'Connections & Billing'
        },
        {
          name: 'Customer Experience Advocacy',
          type: 'Connections & Billing'
        },
        {
          name: 'Customer Market Operations',
          type: 'Connections & Billing'
        },
        {
          name: 'Product & Portfolio',
          type: 'Connections & Billing'
        }
      ];
    } else if (input === '2') {
      this.cardData = [
        {
          name: 'Channel Strategy & Marketing',
          type: 'Connections & Billing'
        },
        {
          name: 'Customer Solutions',
          type: 'Connections & Billing'
        },
        {
          name: 'Digital Sales & Service',
          type: 'Connections & Billing'
        },
        {
          name: 'perth Energy',
          type: 'Connections & Billing'
        }
      ];
    } else if (input === '3') {
      this.cardData = [
        {
          name: 'Brand',
          type: 'Connections & Billing'
        },
        {
          name: 'Customer Experience Delivery',
          type: 'Connections & Billing'
        },
        {
          name: 'Customer Policy',
          type: 'Connections & Billing'
        },
        {
          name: 'Customer Strategy & Insights',
          type: 'Connections & Billing'
        }
      ];
    } else if (input === '4') {
      this.cardData = [
        {
          name: 'Compliance, Risk & Assurance',
          type: 'Connections & Billing'
        },
        {
          name: 'Connection & Billing',
          type: 'Connections & Billing'
        },
        {
          name: 'Credit & Affordability',
          type: 'Connections & Billing'
        },
        {
          name: 'Customer Engagement & Performance',
          type: 'Connections & Billing'
        }
      ];
    } else if (input === '5') {
      this.cardData = [
        {
          name: 'Customer Pricing',
          type: 'Connections & Billing'
        },
        {
          name: 'Emerging Products',
          type: 'Connections & Billing'
        },
        {
          name: 'Product & Proposition',
          type: 'Connections & Billing'
        },
        {
          name: 'Product Strategy & Loyalty',
          type: 'Connections & Billing'
        }
      ];
    }
    this.selectedTab = input;
  }

  goToReports() {
    this.router.navigateByUrl('/example');
  }

  goBack() {
    this._location.back();
  }
}
