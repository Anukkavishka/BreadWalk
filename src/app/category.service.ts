import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  

  constructor(private db : AngularFireDatabase) { }
  
  getCategories(){
    
    return this.db.list('/categories').snapshotChanges();;
    
    /* 

    valueChanges()
    What is it? - Returns an Observable of data as a synchronized array of JSON objects. 
    All Snapshot metadata is stripped and just the method provides only the data.

    Why would you use it? - When you just need a list of data. No snapshot metadata is attached 
    to the resulting array which makes it simple to render to a view.
    
    */

    //got the category entities values all by calling the list() operator

  }
}
