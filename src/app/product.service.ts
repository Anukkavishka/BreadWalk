import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(product) {
    return this.db.list('/product').push(product);

  }

 
  getALLProducts() {

    return this.db.list('/product').snapshotChanges(); //when your accessing .key of a entity you need this.
    /*
    snapshotChanges()
    What is it? - Returns an Observable of data as a synchronized array of
     AngularFireAction<DatabaseSnapshot>[].

    Why would you use it? - When you need a list of data but also want to keep around metadata. 
    Metadata provides you the underyling DatabaseReference and snapshot key. Having the snapshot's
    key around makes it easier to use data manipulation methods. This method gives you more horsepower
    with other Angular integrations such as ngrx, forms, and animations due to the type property. 
    The type property on each AngularFireAction is useful for ngrx reducers, form states,
    and animation states.

    When would you not use it? - When you need a more complex data structure than an array or if you
    need to process changes as they occur. This array is synchronized with the remote and local 
    changes in the Firebase Database.


    
    */


  }
  getProduct(productId :string) {
    return this.db.object('/product/' + productId).valueChanges();

  }

  updateProduct(productId,product){

    return this.db.object('/product/'+productId).update(product);

  }

  deleteProduct(productId:string){
    //console.log("inside service layer");
    return this.db.object('/product/'+productId).remove();
  
  }

}
