import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TapProvider } from '../providers/tap/tap';
import { TruckProvider } from '../providers/truck/truck';
import { UpdatePage } from '../pages/update/update';
import { UpdatetruckPage } from '../pages/updatetruck/updatetruck';
import { MapPage } from '../pages/map/map';

 var config = {
    apiKey: "AIzaSyCDA2SmyMOpqB49eOYtL566O6_QZOQL9zQ",
    authDomain: "waterapp-aa3d2.firebaseapp.com",
    databaseURL: "https://waterapp-aa3d2.firebaseio.com",
    projectId: "waterapp-aa3d2",
    storageBucket: "waterapp-aa3d2.appspot.com",
    messagingSenderId: "319915755205"
 };
 firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    UpdatePage,
    MapPage,
    UpdatetruckPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UpdatePage,
    MapPage,
    UpdatetruckPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TapProvider,
    TruckProvider
  ]
})
export class AppModule {}
