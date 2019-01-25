import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/database';

@Injectable()
export class TruckProvider {
  firedata=firebase.database().ref('waterService/trucks/answers');
  constructor() {
 
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
