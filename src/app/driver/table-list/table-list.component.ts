import { Component, OnInit } from '@angular/core';
import {DriverService} from '../services/driver.service';
import {OrderService} from '../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  clientRequests: any = null;

  constructor(private driverService: DriverService,
              private orderService: OrderService,
              private route: Router) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.driverService.getRequests().subscribe( data => {
      this.clientRequests = data;
      console.log(data);
    });
  }

  acceptRequest(offer_id: any) {
    console.log('accepted');
    this.orderService.acceptRequest(offer_id).subscribe(data => {
      console.log(data);
    });
  }

  onClient(id) {
    this.route.navigate(['driver/client-info', id]);
  }
}
