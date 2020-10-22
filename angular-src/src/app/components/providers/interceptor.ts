import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
// import { LoaderService } from './loaderService';
import {LoaderService} from './loaderService'

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const busyIndicatorService = this.injector.get(LoaderService);
    // showing the spinner
    busyIndicatorService.show();
    return next.handle(request)
      .pipe(
        finalize(() => busyIndicatorService.hide())
      );
  }

}


