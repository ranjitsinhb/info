import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataShareService {

  private messageSource = new BehaviorSubject<string>("asd");
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  capitalize(charAt: string) {
    return charAt.slice(0, 1).toUpperCase() + charAt.slice(1);
  }

}
