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
   keys=[];
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
  constructor(public navCtrl: NavController, private truckprovider:TruckProvider,public navParams: NavParams) {
    this.key=this.navParams.get('key');
    this.reftruck=firebase.database().ref('waterService/trucks/answers/');

    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);
      for(var i=0;i<this.listTrucks.length;i++){
        this.keys.push(this.listTrucks[i].key)
        if(this.key===this.keys[i]){
            this.reliable=this.listTrucks[i].reliable;
            this.days=this.listTrucks[i].days;
            this.liters=this.listTrucks[i].liters
            this.starttime=this.listTrucks[i].optime;
            this.endtime=this.listTrucks[i].clotime;
            console.log('data',this.startTime)
        }
      }
      console.log('hey',this.listTrucks);
    });
    this.truckprovider.getalltrucks().then((res: any) => {
      this.trucks=res;
     
    });
  }
  ionViewDidLoad() {
    
  }
  lastFive:string;

  updateTruck(){
    this.updateFire=firebase.database().ref('waterService/trucks/answers/'+this.key);
    this.time=this.starttime+' - '+this.endtime;
    this.lastFive=this.key.substr(this.key.length -5);
    console.log('trcuk', this.lastFive);
    this.updatetk(this.lastFive);
    this.navCtrl.pop();
  }
  updatetk(id:string):Promise<any>{
     return this.updateFire.update({id})
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