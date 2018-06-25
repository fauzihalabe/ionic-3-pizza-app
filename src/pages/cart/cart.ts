import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cart = [];
  modal = false;
  amount = 0;
  user;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider
  ) {
    this.getCartData();
    this.getCurrentUser();
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

  //Get products added on cart
  getCartData() {
    this.storage.get('cart_pizza_app')
      .then((res) => {
        if (res) {
          this.cart = res;
          this.updateAmount();
        }
      })
  }

  //Update amount
  updateAmount() {
    //Amount
    let i = 0;
    for (i; i < this.cart.length; i++) {
      let price = parseFloat(this.cart[i].price);
      this.amount = this.amount + price;
    }
  }

  //Convert to price format
  toPrice(price) {
    price = parseFloat(price);
    return price.toFixed(2);
  }

  //Remove item from cart
  removeItem(i, item) {
    let index = i;
    this.cart.splice(index, 1);
    // Update cart on storage
    this.storage.set('cart_pizza_app', this.cart)
      .then((res) => {
        let alert = this.alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Item removido do seu carrinho com sucesso!',
          buttons: ['Ok']
        });
        alert.present();
        this.updateAmount();
      })
  }

  //Get current user data
  getCurrentUser() {
    this.storage.get('user_pizza_app')
      .then((user) => {
        this.user = user;
      })
  }

  //Pay and create order
  pay() {
    const prompt = this.alertCtrl.create({
      title: 'Finalizar',
      message: "Total: R$" + this.toPrice(this.amount),
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Efetuar pedido',
          handler: data => {
            //Crate order on firestore
            this.loadingProvider.present();
            let order = {
              items: this.cart,
              total: this.amount,
              from: this.user.uid
            }
            this.firebaseProvider.postOrder(order)
              .then((res) => {
                this.loadingProvider.dismiss();
                //Clear storage cart
                this.storage.set('cart_pizza_app', null);

                //Alert
                let alert = this.alertCtrl.create({
                  title: 'Obrigado',
                  subTitle: 'Seu pedido já foi encaminhado!',
                  buttons: ['Voltar']
                });
                alert.present();
              })
          }
        }
      ]
    });
    prompt.present();
  }

}
