import { LoginPage } from '../pages/login/login';
import { ProfileProvider } from './../../providers/profile/profile';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert,Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import firebase, { User} from 'firebase/app';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
 public userForm:FormGroup;

  firstName:string;
  lastName:string;
  email:string;
  password:string;
 constructor(public navCtrl: NavController, private profilePROV:ProfileProvider, private loadingCTR: LoadingController,
    private alertCTR: AlertController, private authPROV: AuthProvider,public FB:FormBuilder) {

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
      let loading = this.loadingCTR.create({
        content: 'Please wait..'
      });
    
      loading.present();
     this.authPROV.signUp(this.userForm.value.email,this.userForm.value.password)
     .then(authPROV =>{
      loading.dismiss();
     this.load.dismiss().then(()=>{
     this.profilePROV.UserDetails(this.userForm.value.firstName, this.userForm.value.lastName) 
     .then(() => {
     this.userForm.reset();
       })
       
       const alert = this.alertCTR.create({
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
          
        const alert = this.alertCTR.create({
        subTitle:'The email is alread in use by another account',
        buttons:[{text:'ok',role:'cancel'}]
          })


          alert.present();
        })
      })
    }
    this.load=this.loadingCTR.create();
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