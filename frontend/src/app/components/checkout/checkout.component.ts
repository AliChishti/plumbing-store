import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { concatMap, from, Observable, toArray } from 'rxjs';
import { Card } from 'src/app/models/Card';
import { Cart } from 'src/app/models/Cart';
import { Item } from 'src/app/models/Item';
import { Order } from 'src/app/models/Order';

import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cardForm!: FormGroup;
  cart$!: Observable<Cart>;
  product$!: number;
  total$!: number;
  tax$!: number;
  payable$!: number;
  card$!: Card;
  payableCart$!: Item[];
  order$!: Order;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.total$ = 0;
    this.cart$ = this.cartService.get();

    this.route.queryParamMap.subscribe((params: any) => {
      this.product$ = params.params.product ?? null;
    });

    this.cart$.subscribe((cart) => {
      cart.items.map((item: any) => {
        if (!this.product$ || this.product$ == item.id) {
          this.total$ += item.price * item.quantity;
        }
      });
      this.tax$ = Number((0.17 * this.total$).toFixed(2));
      this.payable$ = this.tax$ + this.total$;

      this.payableCart$ = cart.items.filter(
        (item: any) => !this.product$ || this.product$ == item.id
      );
    });

    this.checkoutService.getCard().subscribe((card) => {
      this.card$ = card;
      this.cardForm = this.createFormGroup();
    });
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      validity: new FormControl(this.card$.validity, [Validators.required]),
      ccv: new FormControl(this.card$.ccv, [Validators.required]),
      type: new FormControl(this.card$.type, [Validators.required]),
      number: new FormControl(this.card$.number, [Validators.required]),
    });
  }

  payAmount(): void {
    this.checkoutService
      .payAmount({
        detail: JSON.stringify(this.payableCart$),
        price: this.payable$,
      })
      .subscribe(() => {
        from(this.payableCart$).pipe(
          concatMap(item => this.cartService.removeItem(item.id)),
          toArray()
        ).subscribe((msg)=>{
          window.location.replace("/store");
        })
      });
  }

  saveCard(): void {
    this.checkoutService.saveCard(this.cardForm.value).subscribe();
  }
}
