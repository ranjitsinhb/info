import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './createuser.component';
@NgModule({
  declarations: [
    User,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    
  ],
  bootstrap: [User]
})
export class AddUser{ }
