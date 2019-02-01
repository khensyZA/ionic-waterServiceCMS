import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { TapProvider } from '../../providers/tap/tap';
import { Observable } from 'rxjs';
import { UpdatePage } from '../update/update';
import { UpdatetruckPage } from '../updatetruck/updatetruck';
import leaflet from 'leaflet';
import { Geofence } from '@ionic-native/geofence/ngx';
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

  constructor(public navCtrl: NavController,private geofence: Geofence,private truck:TruckProvider, public alertCtrl: AlertController,public modalCtrl:ModalController, private tap:TapProvider) {
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
      console.log()
      this.taps=res;
      console.log("new taps",this.taps)
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
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 18
    })
  //Geofencing
    .on('locationfound', (e) => {
      this.map.setView([-26.0063121, 28.2108827], 16);
      let markerGroup = leaflet.featureGroup();
      // let marker: any = leaflet.marker([-26.0063121, 28.2108827]);
      // marker.bindPopup(e.latlng.toString() +"<html>I'm here!</b><html>").openPopup();
      // markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      var circle = leaflet.circle([-26.0063121, 28.2108827], {
        color: 'coral',
             fillColor: 'rgba(0.0,0.0,0.0,0.3)',
          fillOpacity: 0.5,
          radius: 7500
       }).addTo(this.map);
       circle.bindPopup("My area.");
     }).on('locationerror', (err) => {
       alert(err.message);
     });
  
     
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

    for( i=0;i<this.taps.length;i++){
      console.log("tapss",this.taps)
      this.tapLatitude.push(this.taps[i].latitude);
      this.taplongitude.push(this.taps[i].longitude);
      console.log("lat",this.tapLatitude)
       }
       console.log('Geofence addedsss',this.tapLatitude[i]);
    for(var i=0;i<this.tapLatitude.length;i++){
      console.log('Geofence addedsss',this.tapLatitude[i]);
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