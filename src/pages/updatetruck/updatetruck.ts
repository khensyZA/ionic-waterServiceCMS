import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
/**
 * Generated class for the UpdatetruckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatetruck',
  templateUrl: 'updatetruck.html',
})
export class UpdatetruckPage {
   key:any;
   data=[];
   tap=[];
   starttime='';
   endtime=''
   liters:string='';
   reliable:string='';
   time:string='';
   days:string='';
   updateFire:firebase.database.Reference;
   startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
   endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
   arrdays=['1','2','3','4','5','6','7'];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.key=this.navParams.get('key');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatetruckPage');
  }
  updateTruck(){
    this.updateFire=firebase.database().ref('waterService/trucks/answers/'+this.key);
    this.time=this.starttime+' - '+this.endtime;
    this.updatetk(this.days,this.liters,this.reliable,this.time);
    this.navCtrl.pop();
}
updatetk(days:string,liters:string,reliable:string,time:string):Promise<any>{
  return this.updateFire.update({days,liters,reliable,time})
}
}
