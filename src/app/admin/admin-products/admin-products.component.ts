import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/app-product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  
  products;
  subscription :Subscription;

  constructor(private productService : ProductService) {
    this.subscription=this.productService.getALLProducts().subscribe(pr =>this.products=pr);
  }

  
  ngOnInit() {
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
