import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader;
  constructor() {
    this.showLoader = new BehaviorSubject(null);
  }
  show() {
    this.setIsLoader(true);
  }
  hide() {
    this.setIsLoader(false);
  }
  
  setIsLoader(isloader) {
    setTimeout(() => {
      this.showLoader.next(isloader);
    }, 0)
  }

  getloader() {
    return this.showLoader.asObservable();
  }


}
