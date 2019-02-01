import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TapProvider } from '../../providers/tap/tap';
/**
 * Generated class for the UpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update',
  templateUrl: 'update.html',
})
export class UpdatePage {
   key:any;
   data=[];
   tap=[];
   taps=[];
   starttime='';
   endtime='';
   listTaps = [];
   location:string='';
   reliable:string='';
   time:string='';
   safety:string='';
   reftap:firebase.database.Reference;
   updateFire:firebase.database.Reference;
  
   startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
   endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  constructor(public navCtrl: NavController,  private tapProvider:TapProvider,public navParams: NavParams) {
      this.key=this.navParams.get('key');
      this.reftap = firebase.database().ref('waterService/taps/answers/'+this.key);
      this.reftap.on('value', resp => {
        this.listTaps = snapshotToArray(resp);
      });
      this.tapProvider.getalltaps().then((res: any) => {
        this.taps=res;
        console.log('t',this.taps);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
    this.uploadTaps();
  }
 
  updateTap(){
      this.updateFire=firebase.database().ref('waterService/taps/answers/'+this.key);
      this.time=this.starttime+' - '+this.endtime;
      this.update(this.reliable,this.safety,this.time);
      this.navCtrl.pop();
  }
  update(reliable:string,safety:string,time:string):Promise<any>{
    return this.updateFire.update({reliable,safety,time})
  }
  uploadTaps(){

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