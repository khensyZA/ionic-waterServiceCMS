import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, LoadingController ,Loading} from 'ionic-angular';
import { HomePage } from '../home/home';
import { ResetPage } from '../reset/reset';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  private load:Loading;

  Email:string;
  Password:string;
  checkUser:boolean;
  userForm:FormGroup;

  islogin=false;
  isSignup=true;

  constructor(public navCtrl: NavController,
    private alertCtrl:AlertController,
     private loadingCtrl:LoadingController, 
     public navParams: NavParams,public FB:FormBuilder,
     private auth:AuthProvider) {


      this.userForm= this.FB.group({

        Email:['',Validators.compose([Validators.required,Validators.minLength(3)])],

        Password:['',Validators.compose([Validators.required,Validators.minLength(6),
         ])]
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  dashboard(){
    if(!this.userForm.valid){
      console.log(this.userForm.valid)
    }
    else{
      let loading= this.loadingCtrl.create({
        content: 'Logging in...'
      });

      loading.present();
      this.auth.signIn(this.userForm.value.Email, this.userForm.value.Password)
      .then(authData=>{
        loading.dismiss();
        this.load.dismiss().then(()=>{
        this.navCtrl.setRoot(HomePage);
       })
      }, error=>{
        this.load.dismiss().then(()=>{
          loading.dismiss();
          const alert = this.alertCtrl.create({
            subTitle: 'Please check your details or signup',
            buttons: [{
              text:'OK',
              handler: data=>{

              }
            }],
            cssClass: 'alertcss'
          });
          alert.present();
        })
      })
      this.load= this.loadingCtrl.create();
    } 

  }
  login(){
     this.islogin=true;
  }

  reset(){
    this.navCtrl.setRoot(ResetPage);
  }

  singup(){
    this.navCtrl.setRoot(SignupPage);
  }
}
