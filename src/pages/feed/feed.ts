import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
  amount = 0;
  items = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private modalCtrl: ModalController
  ) {
    this.getCurrentUser();
    this.getProducts();
    this.loadingProvider.present();
  }

  //Refresh page
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  //Open product page
  open(p) {
    let modal = this.modalCtrl.create('ProductPage', { product: p });
    modal.present();
  }

  //Open cart
  openCart() {
    let modal = this.modalCtrl.create('CartPage', { modal: true });
    modal.present();
  }

  //Open products
  openProducts() {
    let modal = this.modalCtrl.create('MenuPage', { modal: true });
    modal.present();
  }

  ionViewDidLoad() {
    //Build cart
    this.storage.get('cart_pizza_app')
      .then((res) => {
        if (res) {
          this.items = res;

          //Amount
          let i = 0;
          for (i; i < this.items.length; i++) {
            let price = parseFloat(this.items[i].price);
            this.amount = this.amount + price;
          }
        }
      })
  }

  //Get current user data
  getCurrentUser() {
    this.storage.get('user_pizza_app')
      .then((user) => {
        this.user = user;
      })
  }

  //List all produtcs to slides
  getProducts() {
    this.firebaseProvider.getProducts()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.products = res;
      })
  }

  //Convert to price format
  toPrice(price) {
    price = parseFloat(price);
    return price.toFixed(2);
  }

}
