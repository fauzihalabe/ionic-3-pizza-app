import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    feedTab = 'FeedPage';
    menuTab = 'MenuPage';
    cartTab = 'CartPage';
    profileTab = 'ProfilePage';
    selectTab = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {

    }
}

