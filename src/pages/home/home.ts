import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database'
import { TapProvider } from '../../providers/tap/tap';
import { Observable } from 'rxjs';
import { UpdatePage } from '../update/update';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  newTap;
   taps=[];
   tl:Observable<any>
   arrData=[];
   infos = [];
  
   ref = firebase.database().ref('waterService/taps/answers/');
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public modalCtrl:ModalController, private tap:TapProvider,private fdb: AngularFireDatabase) {
   this.ref.on('value', resp => {
      this.infos = snapshotToArray(resp);
      console.log('tap',this.infos)
    });
  }
  ionViewDidEnter() {
    this.tap.getalltaps().then((res: any) => {
      this.taps=res;
      console.log('list taps',this.taps);
    });
  }
  deleteTaps(key){
    firebase.database().ref('waterService/taps/answers/'+key).remove();
  }
  updateTap(key){
    let location='13241 - 32144';
    let addModal = this.modalCtrl.create(UpdatePage,{key:key,location:location});
    addModal.onDidDismiss(() => {
      
    });
    addModal.present();
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
};