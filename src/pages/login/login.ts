import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    })
  }

  login() {
    this.loadingProvider.present().then(() =>{
      let data = this.form.value;
      this.authProvider.login(data)
        //Success
        .then((res) => {
          this.getAndSaveCurrentUser(res.user.uid);
        })
        //Error
        .catch(() => {
          this.loadingProvider.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Ops',
            subTitle: 'Algo deu errado. Por favor, tente mais uma vez.',
            buttons: ['Ok']
          });
          alert.present();
        })
    });
  } 

  getAndSaveCurrentUser(uid){
    this.firebaseProvider.getCurrentUser(uid)
    .subscribe((res) => {
      let user = res[0];
      this.storage.set('user_pizza_app', user).then(() =>{
        this.loadingProvider.dismiss();
        this.navCtrl.setRoot('TabsPage');
      });
    })
  }

  /**
   * Seta o root da aplicação na página de criar conta
   */
  createAccount = () => this.navCtrl.push('CreateAccountPage');

}
