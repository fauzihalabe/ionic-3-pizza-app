import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingProvider {
    loading: Loading;
    constructor(public loadingCtrl: LoadingController) {
    }

    present() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
          <div class="custom-spinner-container">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
          </div>`
        });

        return this.loading.present();
    }

    dismiss() {
        return new Promise((resolve, reject) => {
            if (this.loading) {
                return this.loading.dismiss(resolve(true)).catch(error => {
                });
            } else {
                resolve(true);
            }
        });

    }
}