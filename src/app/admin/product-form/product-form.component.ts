import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map,take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit,OnDestroy {
  
  categories$ ;
  urlproduct ={};
  id;
  subscription: Subscription;
  constructor(
    private router :Router,
    private activatedRoute: ActivatedRoute, //this is used to pass the activated object to a new url
    private categoryService :CategoryService,
    private productservice: ProductService) {
  this.categories$=categoryService.getCategories();
    // we are getting and populating the categories by the service

    //we are getting the project from the route params and passing it on
     this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if(this.id) {
      console.log('id is : '+this.id);
     this.subscription= this.productservice.getProduct(this.id).subscribe(p => {
        if(p){ 
        this.urlproduct=p;
        console.log(p+'value assigned');
        } 
      });
      console.log(this.urlproduct);
    }
  }

  ngOnDestroy(): void { 

    this.subscription.unsubscribe();
  }

  ngOnInit() {

  }

  save(product){
    if(this.id) this.productservice.updateProduct(this.id,product);
    else this.productservice.createProduct(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm("Are you sure you want to Remove this Product?")){
      console.log("inside event function");
        this.productservice.deleteProduct(this.id);
        this.router.navigate(['/admin/products']);
    }
  }
}
