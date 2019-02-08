import { TapProvider } from './../providers/tap/tap';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
<<<<<<< HEAD

import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { Observable } from 'rxjs';

import leaflet from 'leaflet';
import { ThrowStmt } from '@angular/compiler';



=======
import { LoginPage } from '../pages/login/login';
>>>>>>> 8d538f5b3cbc1f303f990a40d2e4f8282d7b63e9
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>;

  newTap;
  taps=[];
  trucks=[];
  isTap=true;
  isTruck=false;
  tl:Observable<any>
  arrData=[];
  listTaps = [];
  listTrucks = [];
  map: any;
  tapLatitude=[];
  taplongitude=[];
  truckLatitude=[];
  trucklongitude=[];
  reftap = firebase.database().ref('waterService/taps/answers/');
  reftruck=firebase.database().ref('waterService/trucks/answers/');

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  ) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
   
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  changeTap(){
    this.isTap=true;
    this.isTruck=false;
  }
  changeTruck(){
    this.isTruck=true;
    this.isTap=false;
  }

  

}

