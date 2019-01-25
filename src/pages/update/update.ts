import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
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
   starttime='';
   endtime=''
   location:string='';
   reliable:string='';
   time:string='';
   safety:string='';
   updateFire:firebase.database.Reference;
   startTime=["06:00","07:00","08:00","09:00","10:00","11:00","12:00"];
   endTime=["13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.key=this.navParams.get('key');
      this.location=this.navParams.get('location');
      this.updateFire=firebase.database().ref('waterService/taps/answers/'+this.key);
     
  }
  updateTap(){
      this.location = this.location;
      console.log('data',this.location);
      this.time=this.starttime+' - '+this.endtime;
      this.update(this.location,this.reliable,this.safety,this.time);
      this.navCtrl.pop();
  }
  update(location:string,reliable:string,safety:string,time:string):Promise<any>{
    return this.updateFire.update({location,reliable,safety,time})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePage');
  }

}
