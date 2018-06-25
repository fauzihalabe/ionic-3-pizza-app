import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ToastController
} from "ionic-angular";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-product",
  templateUrl: "product.html"
})
export class ProductPage {
  product;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage,
    public toastCtrl: ToastController
  ) {
    this.product = this.navParams.get("product");
  }

  //Refresh page
  refresh = refresher => {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  };

  //Close modal
  close = () => this.viewCtrl.dismiss();

  //Add product to cart
  addToCart = () => {
    let cart = [];
    this.storage.get("cart_pizza_app").then(res => {
      if (res) cart = res;

      //Push product to cart
      let product = {
        price: this.product.price,
        title: this.product.title
      };
      cart.push(product);

      //Save to storage
      this.storage.set("cart_pizza_app", cart).then(() => {
        this.toastCtrl
          .create({
            message: `Já adicionamos ${this.product.title} ao seu carrinho ;)`,
            showCloseButton: true,
            closeButtonText: "Ok",
            position: "top",
            duration: 3000
          })
          .present()
          .then(() => {
            this.close();
          });
      });
    });
  };

  //Convert to price format
  toPrice = price => parseFloat(price).toFixed(2);
}
