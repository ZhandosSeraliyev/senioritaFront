import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../login.service';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {CurrentUser} from '../current-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  title = 'app';
  zhandos = 'zhandos is the best';

  constructor(private loginService: LoginService,
              private appService: AppService,
              private router: Router,
              private currentUser: CurrentUser) {
  }

  ngOnInit() {
    this.formLogin = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.formLogin);
    this.loginService.login(this.formLogin.get('login').value, this.formLogin.get('password').value).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.access_token);
        this.getUser();
      }, error => {
        console.log('error');
      }
    );
  }

  getUser() {
    this.appService.getData3().subscribe(
      (user) => {
        console.log(user);
        this.currentUser.setCurrentUser(user);
        this.router.navigate(['home']);
      }
    );
  }

  createAccount() {
    console.log('creatingAccount');
    this.router.navigate(['register']);
  }
}
