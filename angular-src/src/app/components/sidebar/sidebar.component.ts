import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarItems = [
    {title: 'home', icons: 'fa fa-home', path: '/home-page'},
    {title: 'graph', icons: 'fa fa-chart-bar', path: '/home-page'},
    {title: 'appointments', icons: 'fa fa-calendar-day', path: '/home-page'},
    {title: 'enquiries', icons: 'fa fa-search', path: '/home-page'},
    {title: 'settings', icons: 'fa fa-cog', path: '/home-page'},
  ];
  isSideBarOpen = false;
  activeIndex: number = null;
  userName = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userName =  sessionStorage.getItem("user");
    this.sidebarItems.map((eachItem, ind) => {
      if (eachItem.path === this.router.url) {
        this.activeIndex = ind;
      }
    });
  }
  selecteByRoute(selectedItem, ind): any {
    this.sidebarItems.map(eachItem => {
      if (eachItem.title === selectedItem.title) {
        this.activeIndex = ind;
        this.router.navigate([`${selectedItem.path}`]);
      }
    });
  }
}
