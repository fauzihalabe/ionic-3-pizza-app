import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  products;
  modal = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private modalCtrl: ModalController,
    private viewCtrl: ViewController
  ) {
    this.getProducts();
    this.loadingProvider.present();
    this.modal = this.navParams.get('modal');
  }

  //Refresh page
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  //Close modal
  close() {
    this.viewCtrl.dismiss()
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

  //List all produtcs to slides
  getProducts() {
    this.firebaseProvider.getProducts()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.products = res;
      })
  }

}
