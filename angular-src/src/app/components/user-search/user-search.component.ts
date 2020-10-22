import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  searchValue ='';
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  search(value) {
    this.router.navigate([`user/${value}`]);
  }
}
