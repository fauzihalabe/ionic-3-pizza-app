import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  products;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider
  ) {
    this.getProducts();
    this.loadingProvider.present();
  }

   //List all produtcs to slides
   getProducts(){
    this.firebaseProvider.getProducts()
    .subscribe((res) => {
      this.loadingProvider.dismiss();
      this.products = res;
    })
  }

}
