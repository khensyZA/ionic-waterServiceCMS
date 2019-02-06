import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  login(){
    this.navCtrl.setRoot(LoginPage);
  }
  dashboard(){
    this.navCtrl.setRoot(HomePage)
  }

}
