import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from './user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { FormsModule} from '@angular/forms'; 
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { from } from 'rxjs';
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),// here we pass and initialize the firebase config
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    RouterModule.forRoot([
      {path:'',component :HomeComponent},
      {path:'product',component :ProductComponent},
      {path:'shopping-cart',component :ShoppingCartComponent},
      {path:'login',component : LoginComponent},
      //above routes are for any user who is logged in or not
      {path:'check-out',component :CheckOutComponent , canActivate :[AuthGuardService] },
      {path:'order-success',component :OrderSuccessComponent, canActivate :[AuthGuardService]},
      {path:'my/orders',component : MyOrdersComponent, canActivate :[AuthGuardService]}, 
      //above routing are only for the logged in users
      {path:'admin/orders',component :AdminOrdersComponent, canActivate :[AuthGuardService,AdminAuthGuardService]},
      {path:'admin/products/new',component :ProductFormComponent, canActivate :[AuthGuardService,AdminAuthGuardService]},
      {path:'admin/products/:id',component :ProductFormComponent, canActivate :[AuthGuardService,AdminAuthGuardService]},
      {path:'admin/products',component :AdminProductsComponent, canActivate :[AuthGuardService,AdminAuthGuardService]},
      
      //above routing are only for the admins
      //AuthGuardService - for guarding routes from anonymous users
      //AdminAuthGuardService - for guarding admins privileges from the logged in users
    ]),
    NgbModule.forRoot(),

  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AngularFireDatabase,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
