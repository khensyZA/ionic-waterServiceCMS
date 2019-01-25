import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { AngularFireDatabase } from 'angularfire2/database'
/*
  Generated class for the TruckProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TapProvider {

  location:string;
  time:string;
  people:string;
  reliable:string;
  safety:string;
  arrData=[];
  firedata=firebase.database().ref('waterService/taps/answers');
  snap;
  constructor(private fdb: AngularFireDatabase) {
 
  }
  getalltaps() {

    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        console.log('snap',snapshot.val())
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
 
   }

}
