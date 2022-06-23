import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderSearchForm!: FormGroup;
  orders$!: Observable<Order[]>;
  openedOrder$!: Observable<Order>;
  isOrderModalOpen$!: boolean;
  openOrderId$!: number | null;
  isAdmin$!: boolean;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getByUser();
    this.isAdmin$ = localStorage.getItem('user') === '"admin"';
    this.isOrderModalOpen$ = false;
    this.orderSearchForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      orderId: new FormControl('', [Validators.required]),
      orderStatus: new FormControl(''),
    });
  }

  openOrder(order: number) {
    this.openedOrder$ = this.orderService.get(order);
    this.isOrderModalOpen$ = true;
  }

  closeOrderModal() {
    this.isOrderModalOpen$ = false;
  }

  searchOrder() {
    this.openOrder(this.orderSearchForm.value.orderId);
  }

  updateStatus(order: number) {
    this.orderService.updateStatus(
      { status: this.orderSearchForm.value.orderStatus },
      order
    ).subscribe();
  }

  stopProp(event: any) {
    event.stopPropagation();
  }
}
