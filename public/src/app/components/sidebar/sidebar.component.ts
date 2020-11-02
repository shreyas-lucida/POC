import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarItems: any[];
  isSideBarOpen = false;
  activeIndex: number = null;
  userName = '';
  name: any;
  isAdmin = false;
  constructor(private router: Router, private _msalService: MsalService) {
    this.getAuthDetails();
  }

  ngOnInit(): void {
    this.sidebarItems.map((eachItem, ind) => {
      if (eachItem.path === this.router.url) {
        this.activeIndex = ind;
      }
    });

    const account = this._msalService.getAccount();
    if (account) {
      this.name = account.name;
      this.userName = account.userName;
    }
  }


  getAuthDetails() {
    const account = (this._msalService.getAccount().idToken as any).roles;
    let isAdmin = account.find(element => element === "Admin")
    if (isAdmin === "Admin") {
      this.isAdmin = true;
      this.sidebarItems = [
        { title: 'home', icons: 'fa fa-home', path: '/home' },
        { title: 'enquiries', icons: 'fa fa-search', path: '/reports-search' },
        { title: 'settings', icons: 'fa fa-cog', path: '/settings' },
      ];
    } else {
      this.isAdmin = false;
      this.sidebarItems = [
        { title: 'home', icons: 'fa fa-home', path: '/home' },
        { title: 'enquiries', icons: 'fa fa-search', path: '/reports-search' }
      ];
    }

  }
  selecteByRoute(selectedItem, ind): any {
    this.sidebarItems.map(eachItem => {
      if (eachItem.title === selectedItem.title) {
        this.activeIndex = ind;
        this.router.navigate([`${selectedItem.path}`]);
      }
    });
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
