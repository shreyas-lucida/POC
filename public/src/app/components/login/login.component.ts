import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  email: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.userChanged.subscribe((user) => {
      if (user) {
        this.toastService.success(
          `Login successfully`,
          `You are now logged in`
        );
        // sessionStorage.setItem('user', user.firstName);
        // this.router.navigateByUrl('/home-page');
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLoginClick(): void {
    // this.authService.login(this.email, this.password).subscribe();
    this.router.navigateByUrl('/home');
  }
}
