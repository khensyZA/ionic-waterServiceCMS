import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, LoadingController ,Loading} from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';
import { ProfileProvider } from './../../providers/profile/profile';
// 


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private load:Loading;

  firstName:string;
  lastName: string;
  email:string;
  password:string;
  confirm: string;

  userForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private alertCtrl:AlertController,private profile:ProfileProvider,
  private loadingCtrl:LoadingController,public FB:FormBuilder,
  private auth:AuthProvider) {

  this.userForm= this.FB.group({
  
              firstName:['',Validators.compose([Validators.required,
              Validators.minLength(3),
              Validators.pattern('[a-zA-Z]*')])],
   
            lastName:['',Validators.compose([Validators.required,
            Validators.minLength(3),
            Validators.pattern('[a-zA-Z]*')
            ])],
 
            email:['',Validators.compose([Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
            ])],

        
            password:['',Validators.compose([Validators.required,
            Validators.minLength(6)
            ])],
   
            confirm:['',Validators.compose([Validators.required,
            Validators.minLength(6),
            this.equalto('password')
           ])]
       
        })

     
 
      }

  
   signUp(){
     if(!this.userForm.valid){
     console.log(this.userForm.valid);
     }else{
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      loading.present();
     this.auth.signUp(this.userForm.value.email,this.userForm.value.password)
     .then(auth =>{
      loading.dismiss();
     this.load.dismiss().then(()=>{
     this.profile.UserDetails(this.userForm.value.firstName, this.userForm.value.lastName) 
     .then(() => {
     this.userForm.reset();
       })
       
       const alert = this.alertCtrl.create({
        subTitle:"You are successfully registered",
        buttons: [{
          text:'Ok',
          handler:data=>{
            this.navCtrl.setRoot(HomePage)
            }
          }]
      })
       alert.present();
    
    })
      },error=>{
        this.load.dismiss().then(()=>{
          
        const alert = this.alertCtrl.create({
        subTitle:'The email is alread in use by another account',
        buttons:[{text:'ok',role:'cancel'}]
          })


          alert.present();
        })
      })
    }
    this.load=this.loadingCtrl.create();
  }
  gotosignin(){
    this.navCtrl.push(LoginPage);
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let input = control.value;
        let isValid = control.root.value[field_name] == input;
        if (!isValid)
            return {'equalTo': {isValid}};
        else
            return null;
    };
}
gotosignup(){
  this.navCtrl.push(SignupPage);
}

}

