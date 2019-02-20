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
import { MarkersProvider } from '../providers/markers/markers';
import { Geofence } from '@ionic-native/geofence/ngx';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ChartsPage } from '../pages/charts/charts';
import { ChartsModule } from 'ng2-charts';

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
    LoginPage,
    MapPage,
    ChartsPage,
    SignupPage,
    UpdatetruckPage,
    HomePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UpdatePage,
    SignupPage,
    ChartsPage,
    LoginPage,
    MapPage,
    UpdatetruckPage,
    HomePage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TapProvider,
    TruckProvider,

    MarkersProvider,
  
    Geofence,
    MarkersProvider

  ]
})
export class AppModule {}
