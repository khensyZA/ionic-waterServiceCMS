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
   lat:string;
   lng:string;
   location:string;
   isChecked=true;
   isUpdate=false;

  constructor(public navCtrl: NavController,private truck:TruckProvider, private truckprovider:TruckProvider,public navParams: NavParams) {
    this.lat=this.navParams.get('lat');
    this.lng=this.navParams.get('lng');
    this.location=this.lat+" - "+this.lng;
    console.log('location',this.location);
    console.log('checked',this.isChecked);
    this.reftruck=firebase.database().ref('waterService/trucks/answers/');

    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);
      console.log('hey',this.listTrucks);
    });
    this.truckprovider.getalltrucks().then((res: any) => {
     
    });
  }
  ionViewDidLoad() {
    this.uploadtrucks();
  }
  updateTp(key){
    this.isUpdate=true;
    this.isChecked=false;
    this.key=key;
    this.reliable=this.trucks[0].reliable;
    this.time=this.trucks[0].time;
    this.days=this.trucks[0].days
    this.starttime=this.trucks[0].optime;
    this.endtime=this.trucks[0].clotime;
    
  }
  deleteTruk(key){
    firebase.database().ref('waterService/trucks/answers/'+key).remove();
  }
  updateTruck(){
    this.updateFire=firebase.database().ref('waterService/trucks/answers/'+this.key);
    this.time=this.starttime+' - '+this.endtime;
    this.navCtrl.pop();
  }
  updatetk(id:string):Promise<any>{
     return this.updateFire.update({id})
  }
  uploadtrucks(){
    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);
 
    });
    this.truck.getalltrucks().then((res: any) => {
      this.trucks=res;
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