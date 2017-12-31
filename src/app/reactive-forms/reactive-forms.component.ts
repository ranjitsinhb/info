import { Component, OnInit } from '@angular/core';
import{User} from '../User/Create/createuser.component';
import { FormControl, FormGroup  } from '@angular/forms';
@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  userform: FormGroup;
  constructor() { }

  ngOnInit() {

    this.userform = new FormGroup({
      firstName: new FormControl(''),
      lastName:new FormControl('')
    });
  }

}
