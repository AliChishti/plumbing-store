import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$!: Observable<Cart>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.get();
  }

  increaseQuantity(product:number){
    this.cartService.increaseQuantity(product).subscribe();
  }

  decreaseQuantity(product:number){
    this.cartService.decreaseQuantity(product).subscribe();
  }

  removeItem(product:number){
    this.cartService.removeItem(product).subscribe();
    window.location.reload();
  }
}
