import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TapProvider } from '../../providers/tap/tap';
import { Observable } from 'rxjs';
import { UpdatePage } from '../update/update';
import { UpdatetruckPage } from '../updatetruck/updatetruck';
import leaflet from 'leaflet';
import { ThrowStmt } from '@angular/compiler';
import { TruckProvider } from '../../providers/truck/truck';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   newTap;
   taps=[];
   trucks=[];
   isTap=true;
   isTruck=false;
   tl:Observable<any>
   arrData=[];
   listTaps = [];
   listTrucks = [];
   map: any;
   tapLatitude=[];
   taplongitude=[];
   truckLatitude=[];
   trucklongitude=[];
   reftap = firebase.database().ref('waterService/taps/answers/');
   reftruck=firebase.database().ref('waterService/trucks/answers/');

  constructor(public navCtrl: NavController,private truck:TruckProvider, public alertCtrl: AlertController,public modalCtrl:ModalController, private tap:TapProvider) {

  }
  ngOnInit():void{
    
  }
  ionViewDidEnter() {
  
     this.loadmap();
     this.uploadTaps();
     this.uploadtrucks();
    
    
  }


  login(){

  }
  uploadTaps(){
    this.reftap.on('value', resp => {
      this.listTaps = snapshotToArray(resp);
    });
    this.tap.getalltaps().then((res: any) => {
      this.taps=res;
      this.addTapmakers();
    });
  }
  uploadtrucks(){
    this.reftruck.on('value', resp => {
      this.listTrucks = snapshotToArray(resp);
 
    });
    this.truck.getalltrucks().then((res: any) => {
      this.trucks=res;
       this.addTruckmakers();
    });
  }

  deleteTaps(key){
    firebase.database().ref('waterService/taps/answers/'+key).remove();
  }
  deleteTruk(key){
    firebase.database().ref('waterService/trucks/answers/'+key).remove();
  }
  updateFire:firebase.database.Reference;
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
      maxZoom: 100
    }).addTo(this.map);
    var map = this.map;

    map.locate({ setView: true,  
      maxZoom: 100});

  }

  addTapmakers(){

    const myCustomColour = '#18b8d4'
    const markerHtmlStyles = `
    background-color: ${myCustomColour};
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 2px solid #FFFFFF`
const redMarker = leaflet.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStyles}" />`
})
    for(var i=0;i<this.taps.length;i++){
      this.tapLatitude.push(this.taps[i].latitude);
      this.taplongitude.push(this.taps[i].longitude);
       }
    console.log('latitude',this.tapLatitude);
    console.log('longitude',this.taplongitude);
    for(var i=0;i<this.tapLatitude.length;i++){
  
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([this.tapLatitude[i],this.taplongitude[i]],{icon:redMarker}).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }
    
  }
  addTruckmakers(){
    const myCustomColour = 'red'
    const markerHtmlStyles = `
    background-color: ${myCustomColour};
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 2px solid #FFFFFF`
const redMarker = leaflet.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStyles}" />`
})
    for(var i=0;i<this.trucks.length;i++){
      this.truckLatitude.push(this.trucks[i].latitude);
      this.trucklongitude.push(this.trucks[i].longitude);
       }
    console.log('latitude',this.truckLatitude);
    console.log('longitude',this.trucklongitude);
    for(var i=0;i<this.truckLatitude.length;i++){
   
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([this.truckLatitude[i],this.trucklongitude[i]],{icon:redMarker}).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }
    
  }

// logout(){
//   this.navCtrl.push
// }
// login(){
//   t
// }


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