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
   data=[];
   taps=[];
   keys=[];
   key:string;
   isChecked=true;
   isUpdate=false;
   starttime='';
   endtime='';
   listTaps = [];
   location:string;
   reliable:string="";
   time:string="";
   safety:string="";
   lat:string;
   lng:string;
   reftap:firebase.database.Reference;
   updateFire:firebase.database.Reference;
   startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
   endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  constructor(public navCtrl: NavController,private tap:TapProvider, private tapProvider:TapProvider,public navParams: NavParams) {
   
    this.reftap = firebase.database().ref('waterService/taps/answers/');
    this.lat=this.navParams.get('lat');
    this.lng=this.navParams.get('lng');
    this.location=this.lat+" - "+this.lng;
    console.log('location',this.location);
    console.log('checked',this.isChecked);

    this.reftap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);
      // for(var i=0;i<this.listTaps.length;i++){
      //   this.keys.push(this.listTaps[i].key)
      //   if(this.key===this.keys[i]){
      //       this.reliable=this.listTaps[i].reliable;
      //       this.time=this.listTaps[i].time;
      //       this.safety=this.listTaps[i].safety
      //       this.starttime=this.listTaps[i].optime;
      //       this.endtime=this.listTaps[i].clotime;
      //       console.log('data',this.startTime)
      //   }
      // }
    
    });
    this.tapProvider.getalltaps().then((res: any) => {
      console.log()
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
    this.uploadTaps();
  }
  deleteTaps(key){
    firebase.database().ref('waterService/taps/answers/'+key).remove();
  }
 
  updateTp(key){
    this.isUpdate=true;
    this.isChecked=false;
    this.key=key;
    this.reliable=this.taps[0].reliable;
    this.time=this.taps[0].time;
    this.safety=this.taps[0].safety
    this.starttime=this.taps[0].optime;
    this.endtime=this.taps[0].clotime;
    
  }
  updateTap(){
    console.log('data',this.key);
      this.updateFire=firebase.database().ref('waterService/taps/answers/'+this.key);
      this.time=this.starttime+' - '+this.endtime;
      this.update(this.reliable,this.safety,this.time,this.starttime,this.endtime);
      this.navCtrl.pop();
  }
  update(reliable:string,safety:string,time:string,optime:string,clotime:string):Promise<any>{
    return this.updateFire.update({reliable,safety,time,optime,clotime})
  }
  uploadTaps(){
    this.reftap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);
      for(var i=0;i<this.listTaps.length;i++){
        if(this.location===this.listTaps[i].location){
           this.taps.push(this.listTaps[i]);
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