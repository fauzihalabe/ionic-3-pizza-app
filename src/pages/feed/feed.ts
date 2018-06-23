import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  user;
  products;
  amount = '00,00';
  items = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider
  ) {
    this.getCurrentUser();
    this.getProducts();
    this.loadingProvider.present();
  }

  //Get current user data
  getCurrentUser() {
    this.storage.get('user_pizza_app')
      .then((user) => {
        this.user = user;
      })
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
