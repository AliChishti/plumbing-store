import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  products$!: Observable<Product[]>;
  username!: Pick<User, 'username'>;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.username;
    this.products$ = this.fetchAll();
  }

  fetchAll(): Observable<Product[]> {
    return this.productService.fetchAll();
  }
}
