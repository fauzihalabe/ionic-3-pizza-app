import { Injectable } from "@angular/core";
import { Loading, LoadingController } from "ionic-angular";

@Injectable()
export class LoadingProvider {
  loading: Loading;
  constructor(public loadingCtrl: LoadingController) {}

  /**
   * Present the custom loading.
   * @returns {Promise} Returns a promise after successfully presenting the loading.
   */
  present = (): Promise<any> => {
    this.loading = this.loadingCtrl.create({
      spinner: "hide",
      content: `
          <div class="custom-spinner-container">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
          </div>`
    });

    return this.loading.present();
  };

  /**
   * Dismiss the presented loading.
   * @returns {Promise} Returns a promise after successfully dismissing the loading.
   */
  dismiss = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (this.loading) {
        return this.loading.dismiss(resolve(true));
      } else {
        resolve(true);
      }
    });
  };
}
