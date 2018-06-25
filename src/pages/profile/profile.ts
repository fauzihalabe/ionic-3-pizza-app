import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingProvider } from '../../providers/loading';
import { FirebaseProvider } from '../../providers/firebase';
import { ImagesUpload } from '../../providers/image-upload';
import { Camera } from '@ionic-native/camera';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {
    name: '',
    address: '',
    number: '',
    city: '',
    state: '',
    neighborhood: '',
    complement: '',
    uid: '',
    avatar: ''
  };
  bigImg = null;
  smallImg = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingProvider: LoadingProvider,
    private firebaseProvider: FirebaseProvider,
    public app: App,
    private camera: Camera,
    private storageImages: ImagesUpload,
  ) {
    this.getCurrentUser();
  }

  //Refresh page
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  //Get current user data
  getCurrentUser() {
    this.storage.get('user_pizza_app')
      .then((user) => {
        this.user = user;
      })
  }

  //Save user
  save() {
    this.loadingProvider.present();
    this.firebaseProvider.saveUser(this.user)
      .then((res) => {
        this.getAndSaveCurrentUser(this.user.uid);
      })
  }

  //Update user data on local storage
  getAndSaveCurrentUser(uid) {
    this.firebaseProvider.getCurrentUser(uid)
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        let user = res[0];
        this.storage.set('user_pizza_app', user);
      })
  }

  //Logout
  logout() {
    this.app.getRootNav().setRoot('LoginPage');
  }

  //Image upload
  changeAvatar() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: true,
      targetWidth: 900,
      targetHeight: 900
    }).then(imageData => {
      let base64data = 'data:image/jpeg;base64,' + imageData;
      this.bigImg = base64data;
      //Get image size
      this.createThumbnail();
    }, error => {
    });
  }

  createThumbnail() {
    let load = this.loadingProvider;
    load.present()

    this.generateFromImage(this.bigImg, 1000, 1000, 100, data => {
      this.smallImg = data;
      let imgToUp = this.smallImg.split(',')[1];
      // console.log(imgToUp);
      this.storageImages.uploadPhoto(imgToUp, this.user.uid, 'Profile')
        .then((savedPicture) => {
          let storageRef = firebase.storage().ref('Images/' + 'Profile' + '/' + this.user.uid);
            storageRef.getDownloadURL()
                .then(url => {
                    load.dismiss();
                    this.user.avatar = url;
                });
        })
        .catch((err) => {
          load.dismiss()
        })
    });
  }

  generateFromImage(img, MAX_WIDTH, MAX_HEIGHT, quality, callback) {
    var canvas: any = document.createElement("canvas");
    var image = new Image();
    image.onload = () => {
      var width = image.width;
      var height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(dataUrl)
    }
    image.src = img;
  }
}
