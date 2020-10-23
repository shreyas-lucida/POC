import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import   {MsalService} from '@azure/msal-angular';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarItems = [
    {title: 'home', icons: 'fa fa-home', path: '/home'},
    // {title: 'graph', icons: 'fa fa-chart-bar'},
    // {title: 'appointments', icons: 'fa fa-calendar-day'},
    {title: 'enquiries', icons: 'fa fa-search', path: '/user-search'},
    {title: 'settings', icons: 'fa fa-cog'},
  ];
  isSideBarOpen = false;
  activeIndex: number = null;
  userName = '';
  name: any;
  constructor(private router: Router, private _msalService: MsalService) { }

  ngOnInit(): void {
    this.sidebarItems.map((eachItem, ind) => {
      if (eachItem.path === this.router.url) {
        this.activeIndex = ind;
      }
    });

    const account = this._msalService.getAccount();
    this.name = account.name;
    this.userName = account.userName;
    // this.userName =  sessionStorage.getItem("user");

  }
  selecteByRoute(selectedItem, ind): any {
    this.sidebarItems.map(eachItem => {
      if (eachItem.title === selectedItem.title) {
        this.activeIndex = ind;
        this.router.navigate([`${selectedItem.path}`]);
      }
    });
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
  }
}
