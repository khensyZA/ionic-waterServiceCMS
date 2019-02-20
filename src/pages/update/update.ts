import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TapProvider } from '../../providers/tap/tap';
import { looseIdentical } from '@angular/core/src/util';
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
   data=[];
   taps=[];
   keys=[];
   key:any;
   isChecked=true;
   isUpdate=false;
   starttime='';
   endtime='';
   listTaps = [];
   location:string="";
   reliable:string="";
   time:string="";
   safety:string="";
   lat:string;
   lng:string;
   reftap:firebase.database.Reference;
   updateFire:firebase.database.Reference;
   startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
   endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  constructor(private alertCTR: AlertController,public navCtrl: NavController,private tap:TapProvider, private tapProvider:TapProvider,public navParams: NavParams) {
    
    this.key=this.navParams.get('key');
    console.log('key',this.key);
    this.reftap = firebase.database().ref('waterService/taps/answers/');
 
  }
  ionViewDidLoad() {
    this.uploadTaps();
  }
  click(){
    this.navCtrl.pop();
  }
  updateTap(){
    console.log('data',this.key);
      this.updateFire=firebase.database().ref('waterService/taps/answers/'+this.key);
      this.time=this.starttime+' - '+this.endtime;
      this.update(this.reliable,this.safety,this.time,this.starttime,this.endtime).then((data)=>{
      });
      this.navCtrl.pop();
  }
  update(reliable:string,safety:string,time:string,optime:string,clotime:string):Promise<any>{
  return this.updateFire.update({reliable,safety,time,optime,clotime}).then(data=>{
     
    
   })
  }
  uploadTaps(){
    this.reftap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);
      for(var i=0;i<this.listTaps.length;i++){
        if(this.key===this.listTaps[i].key){
          this.taps.push(this.listTaps[i]);
          this.reliable=this.taps[i].reliable;
          this.time=this.taps[i].time;
          this.safety=this.taps[i].safety
          this.starttime=this.taps[i].optime;
          this.endtime=this.taps[i].clotime; 
       }
      }
      console.log('data',this.taps);
    });
    this.tap.getalltaps().then((res: any) => {
      
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