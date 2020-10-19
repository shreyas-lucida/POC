import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit {
  selectedTab = '1';
  cardData: any[];
  constructor(private _location: Location,
    private router: Router) {
  }
  ngOnInit(): void {
    this.selectedItem('1');
  }

  selectedItem(input) {
    if (input === '1') {
      this.cardData = [
        {
          name: 'Business Energy Solution',
          type: 'Connections & Billing'
        },
        {
          name: 'Commercial & Strategic Energy Sales',
          type: 'Connections & Billing'
        },
        {
          name: 'Commercial Operations & Strategy',
          type: 'Connections & Billing'
        },
        {
          name: 'Perth Energy',
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
    this.router.navigateByUrl('/user');
  }

  goBack() {
    this._location.back();
  }
}
