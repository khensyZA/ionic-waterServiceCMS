import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//  import * as firebase from 'firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';



//  var config = {
//    apiKey: "AIzaSyCDA2SmyMOpqB49eOYtL566O6_QZOQL9zQ",
//    authDomain: "waterapp-aa3d2.firebaseapp.com",
//    databaseURL: "https://waterapp-aa3d2.firebaseio.com",
//    projectId: "waterapp-aa3d2",
//    storageBucket: "waterapp-aa3d2.appspot.com",
//    messagingSenderId: "319915755205"
//  };
//  firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
