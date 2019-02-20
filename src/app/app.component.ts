import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TruckProvider } from '../providers/truck/truck';
import { TapProvider } from '../providers/tap/tap';
import { ChartsPage } from '../pages/charts/charts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  listTaps = [];
   listTrucks = [];
   trucks=[];
   isTap=true;
   isTruck=false;

   taps=[];
   reftap = firebase.database().ref('waterService/taps/answers/');
   reftruck=firebase.database().ref('waterService/trucks/answers/');

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private truck:TruckProvider, public alertCtrl: AlertController, private tap:TapProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ionViewDidEnter() {
  
    this.uploadTaps();
    this.uploadtrucks();

 }
 changeTruck(){
   this.isTruck=true;
   this.isTap=false;
 }
 changeTap(){
   this.isTap=true;
   this.isTruck=false;
 }

 uploadtrucks(){
  this.reftruck.on('value', resp => {
    this.listTrucks = snapshotToArray(resp);

  });
  this.truck.getalltrucks().then((res: any) => {
    this.trucks=res
  });
}
  uploadTaps(){
    this.reftap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);
    });
    this.tap.getalltaps().then((res: any) => {
      console.log()
      this.taps=res;
    });
  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
}
