import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
/*
  Generated class for the WaterserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WaterserviceProvider {

  tabs=[];
  firedata=firebase.database().ref('waterService/taps/answers');
  constructor() {
    console.log('Hello WaterserviceProvider Provider');
  }
  ionViewDidLoad() {

  }
  loadtaps(){
    const tabRef: firebase.database.Reference = firebase.database().ref(`waterService/taps/answers/`);
    tabRef.on('value', personSnapshot => {
      this.tabs = personSnapshot.val();
      console.log('taps',personSnapshot);
    });
   
  }
}
