import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get('/rest/getUser');
  }

  updateUser(user) {
    return this.http.post('/rest/updateUser', user);
  }

  getDriverInfo(id: number) {
    return this.http.get('/rest/getDriver/' + id);
  }
}
