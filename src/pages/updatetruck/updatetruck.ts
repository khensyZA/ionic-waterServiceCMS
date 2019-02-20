import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TruckProvider } from '../../providers/truck/truck';
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
   listTrucks=[];
   trucks=[];
   reftruck:firebase.database.Reference;
   updateFire:firebase.database.Reference;
   startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
   endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
   arrdays=['1','2','3','4','5','6','7'];
   lat:string;
   lng:string;
   location:string;
   isChecked=true;
   isUpdate=false;

  constructor(public navCtrl: NavController,private truck:TruckProvider, private truckprovider:TruckProvider,public navParams: NavParams) {
    this.key=this.navParams.get('key');
    console.log('key',this.key);
    this.reftruck = firebase.database().ref('waterService/trucks/answers/');
 
  }
  ionViewDidLoad() {
    this.uploadTaps();
  }
  click(){
    this.navCtrl.pop();
  }
  updateTap(){
    console.log('data',this.key);
      this.updateFire=firebase.database().ref('waterService/trucks/answers/'+this.key);
      this.time=this.starttime+' - '+this.endtime;
      this.update(this.reliable,this.days,this.time,this.starttime,this.endtime).then((data)=>{
      });
      this.navCtrl.pop();
  }
  update(reliable:string,days:string,time:string,optime:string,clotime:string):Promise<any>{
  return this.updateFire.update({reliable,days,time,optime,clotime}).then(data=>{
     
    
   })
  }
  uploadTaps(){
    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);
      for(var i=0;i<this.listTrucks.length;i++){
        if(this.key===this.listTrucks[i].key){
          this.reliable=this.listTrucks[i].reliable;
          this.time=this.listTrucks[i].time;
          this.days=this.listTrucks[i].days
          this.starttime=this.listTrucks[i].optime;
          this.endtime=this.listTrucks[i].clotime; 
       }
      }
     
    });
    this.truck.getalltrucks().then((res: any) => {
      
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