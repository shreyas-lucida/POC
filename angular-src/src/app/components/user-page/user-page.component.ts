import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { UserProfile } from '../../../../../shared/models/user-profile';
import { AppService, AuthService, ApiService } from '../../core/services';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  cardData: any[];
  showDescription = false;
  selectedItem: any;
  constructor(
    private router: Router,
    private appService: AppService,
    private toastService: ToastrService,
    private authService: AuthService,
    private apiService: ApiService,
    private _location: Location
  ) { }

  get user(): UserProfile {
    return this.appService.user;
  }
  ngOnInit() {
    this.pocTest();
  }
  pocTest(): void {
    this.apiService.testPOC().subscribe(data => {
      if (data.status === 'ok') {
        this.cardData = data.data['card'][0];
        console.log(this.cardData);
        console.log(data)
      }
    })
  };

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/');
      this.toastService.success(
        `You are logged out`,
        `You have succesfully logged out!`
      );
    });
  }

  selectedCard(input) {
    this.selectedItem = input;
  }

  goBack(){
    this._location.back();
  }
}
