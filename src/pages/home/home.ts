import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TapProvider } from '../../providers/tap/tap';
import { Observable } from 'rxjs';
import { UpdatePage } from '../update/update';
import { UpdatetruckPage } from '../updatetruck/updatetruck';
import leaflet from 'leaflet';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   newTap;
   taps=[];
   isTap=true;
   isTruck=false;
   tl:Observable<any>
   arrData=[];
   listTaps = [];
   listTrucks = [];
   map: any;
   reftap = firebase.database().ref('waterService/taps/answers/');
   reftruck=firebase.database().ref('waterService/trucks/answers/');

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public modalCtrl:ModalController, private tap:TapProvider) {

  }
  ngOnInit():void{
    
  }
  ionViewDidEnter() {
     this.loadmap();
     this.uploadTaps();
     this.uploadtrucks();
  }
  uploadTaps(){
    this.reftap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);
      console.log('tap',this.listTaps)
    });
    this.tap.getalltaps().then((res: any) => {
      this.taps=res;
      console.log('list taps',this.taps);
    });
  }
  uploadtrucks(){
    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);
      console.log('tap',this.listTrucks)
    });
    this.tap.getalltaps().then((res: any) => {
      this.taps=res;
      console.log('list taps',this.taps);
    });
  }
  deleteTaps(key){
    firebase.database().ref('waterService/taps/answers/'+key).remove();
  }
  deleteTruk(key){
    firebase.database().ref('waterService/trucks/answers/'+key).remove();
  }
  updateTap(key){
    let addModal = this.modalCtrl.create(UpdatePage,{key:key});
    addModal.onDidDismiss(() => {
 
    });
    addModal.present();
  }
  updateTruck(key){
  let addModal = this.modalCtrl.create(UpdatetruckPage,{key:key});
  addModal.onDidDismiss(() => {

  });
  addModal.present();
}
  changeTap(){
    this.isTap=true;
    this.isTruck=false;
  }
  changeTruck(){
    this.isTruck=true;
    this.isTap=false;
  }
 
  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 15
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
      })
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