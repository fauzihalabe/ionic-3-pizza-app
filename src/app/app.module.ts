import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

//Firebase config
import { firebaseConfig } from '../configs/firebase';

//Providers
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth';
import { FirebaseProvider } from '../providers/firebase';
import { LoadingProvider } from '../providers/loading';
import { IonicStorageModule } from '@ionic/storage';

//Pages
import { LoginPageModule } from '../pages/login/login.module';
import { CreateAccountPageModule } from '../pages/create-account/create-account.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    //Pages
    LoginPageModule,
    CreateAccountPageModule,
    TabsPageModule,
    //Others
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    FirebaseProvider,
    LoadingProvider,
  ]
})
export class AppModule {}
