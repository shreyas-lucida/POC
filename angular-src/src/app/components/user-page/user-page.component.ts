import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import { UserProfile } from '../../../../../shared/models/user-profile';
import { AppService, AuthService, ApiService } from '../../core/services';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  users: any[];
  cardData: any[];
  showDescription = false;
  selectedItem: any;
  searchValue = '';
  seeMore: boolean;
  constructor(
    private router: Router,
    private appService: AppService,
    private toastService: ToastrService,
    private authService: AuthService,
    private apiService: ApiService,
    private _location: Location,
    private route:ActivatedRoute
  ) { }

  get user(): UserProfile {
    return this.appService.user;
  }
  ngOnInit() {
    this.route.params.subscribe( params =>
     this.searchValue = params.search?params.search:''    
     ) 
    this.pocTest();
  }
  pocTest(): void {
    this.apiService.testPOC().subscribe(data => {
      if (data.status === 'ok') {
        this.cardData = data.data['card'][0];
        this.users = data.data['card'][0];
        this.search() 
      }
    });
  }

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

  goBack() {
    this._location.back();
  }
  search() {
    console.log(this.searchValue);
    
    let value = this.searchValue.toLowerCase()
    let filteredData = [] as any
    this.users.map((data: any) => {
      if (data.name.toLowerCase().indexOf(value) !== -1 || data.description.toLowerCase().indexOf(value) !== -1 || value === '') {
        filteredData.push(data);
      }
    });
    this.cardData = filteredData;
  }
  seeMoreOrLess() {
    this.seeMore = !this.seeMore;
  }
}
