import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, LoadingController ,Loading} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

private load:Loading;

  Email:string;
  userForm:FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
   private alertCtrl:AlertController,
   private loadingCtrl:LoadingController,public FB:FormBuilder,
   private auth:AuthProvider) {

this.userForm= this.FB.group({

      Email:['',Validators.compose([Validators.required,Validators.minLength(3)])],


  })
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

  login(){
  this.navCtrl.setRoot(LoginPage)
  }

  reset(){
    if(!this.userForm.valid){
      console.log(this.userForm.valid)
    }
    else{
      const alert = this.alertCtrl.create({
        subTitle: 'Please check your Email',
        buttons: [{
          text:'OK',
          handler: data=>{
       this.navCtrl.setRoot(LoginPage);
          }
        }],
        cssClass: 'alertcss'
      });
       alert.present();
    }
  }

}
