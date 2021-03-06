import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../client/services/client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DriverService} from '../services/driver.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  userForm: any;
  request: any;

  constructor(private driverService: DriverService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.driverService.getUser().subscribe(
      data => {
        this.user = data;
        console.log(this.user);
        this.setUser();
      }
    );
  }

  setUser() {
    this.userForm = new FormGroup({
      'first_name': new FormControl(this.user.firstName, Validators.required),
      'last_name': new FormControl(this.user.lastName, Validators.required),
      'address': new FormControl(this.user.address, Validators.required)
    });
  }

  onSubmit() {
    this.user.firstName = this.userForm.get('first_name').value;
    this.user.lastName = this.userForm.get('last_name').value;
    this.user.address = this.userForm.get('address').value;
    this.driverService.updateUser(this.user).subscribe(data => {
      console.log(data);
    });
  }
}
