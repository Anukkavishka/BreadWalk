//this model will be used as FirebaseObjectObservable<AppUser> as generic
// when returning a app user object from the firebasedb

export interface AppUser{
    name:string;
    email:string;
    isAdmin:boolean;

}