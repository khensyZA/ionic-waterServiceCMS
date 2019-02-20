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
  marker :any;
   newTap;
   taps=[];
   trucks=[];
   isHome=true;
   isTap=true;
   isTruck=false;
   isload=false;
   name="Taps";
   isChecked=false;
   isSearchbarOpened=false;
   tl:Observable<any>
   arrData=[];
   listTaps = [];
   listTrucks = [];
   map: any;
   key='';
   lat:string;
   lng:string;
   tapLatitude=[];
   taplongitude=[];
   truckLatitude=[];
   trucklongitude=[];
   filteredtaps=[];
   filteredtrucks=[];
   temparr=[];
   searchstring:string='';
   reftap = firebase.database().ref('waterService/taps/answers/');
   reftruck=firebase.database().ref('waterService/trucks/answers/');

  constructor(private alertCTR: AlertController,public navCtrl: NavController,private geofence: Geofence,private truck:TruckProvider, public alertCtrl: AlertController,public modalCtrl:ModalController, private tap:TapProvider) {
  }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
 
  //Chart Labels
  public barChartLabels:string[] = ['tap:01 truck 01', 'tap:02 truck 02', 'tap:03 truck 03', 'tap:04 truck 04', 'tap:06 truck 06']
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  //Chart data
  public barChartData:any[] = [
    {data: [66, 55, 83, 82, 56, 51, 43], label: 'Trucks'},
    {data: [29, 38, 40, 21, 82, 30, 89], label: 'Taps'}
  ];
 
  // Chart events
  public chartClicked(e:any):void {
    console.log(e);
  }

  // Chart events
  public chartHovered(e:any):void {
    console.log(e);
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
    
    const alert = this.alertCTR.create({
      subTitle:"Are you sure you want to delete this record?",
      buttons: [{
        text:'No',
        role:'Cancel'
      },{
        text:'Yes',
        handler:data=>{
          firebase.database().ref('waterService/taps/answers/'+key).remove();
          }
        }]
    })
     alert.present();
  }
  deleteTruk(key){
    const alert = this.alertCTR.create({
      subTitle:"Are you sure you want to delete this record?",
      buttons: [{
        text:'No',
        role:'Cancel'
      },{
        text:'Yes',
        handler:data=>{
          firebase.database().ref('waterService/trucks/answers/'+key).remove();
          }
        }]
    })
     alert.present();
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
    this.name="Taps"
  }
  changeTruck(){
    this.isTruck=true;
    this.isTap=false;
    this.name="Trucks"
  }
 
  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 13
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 13
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

    const myCustomColour = 'dodgerblue'
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
    for( i=0;i<this.listTaps.length;i++){
      // console.log("tapss",this.taps)
      this.tapLatitude.push(this.listTaps[i].latitude);
      this.taplongitude.push(this.listTaps[i].longitude);
      // console.log("lat",this.tapLatitude)
    }
    
    for(var i=0;i<this.listTaps.length;i++){
  
      let markerGroup = leaflet.featureGroup();
      this.marker = leaflet.marker([this.tapLatitude[i],this.taplongitude[i]],{icon:redMarker}).bindPopup(
        "Tap ID:"+this.listTaps[i].id+" Time:"+this.listTaps[i].time+" reliable:"+this.listTaps[i].reliable
      )
      markerGroup.addLayer( this.marker);
      this.map.addLayer(markerGroup);
    }
   
    
  }
  onClick(){
    let addModal = this.modalCtrl.create(UpdatePage);
    addModal.onDidDismiss(() => {

    });
    addModal.present();
  }
  loads(){
    let addModal = this.modalCtrl.create(UpdatePage);
    addModal.onDidDismiss(() => {
     
    });
    if(this.isload){
      addModal.present();
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
    for(var i=0;i<this.listTrucks.length;i++){
      this.truckLatitude.push(this.listTrucks[i].latitude);
      this.trucklongitude.push(this.listTrucks[i].longitude);
       }
    for(var i=0;i<this.truckLatitude.length;i++){
   
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([this.truckLatitude[i],this.trucklongitude[i]],{icon:redMarker}).bindPopup("Truck ID:"+this.trucks[i].id+" time:"+this.trucks[i].time+" days:"+this.trucks[i].days+"");
     
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }
    
  }
  searchTaps(searchbar) {
    this.reftap.on('value', resp => {
      this.filteredtaps = snapshotToArray(resp);
      console.log('mao',this.listTaps);
      var q = searchbar.target.value;
      if (q.trim() == '') {
        return;
      }
      console.log('hahah',this.listTaps);
      this.filteredtaps = this.filteredtaps.filter((v) => {
        if(v.id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      })
    });
 
  }
  searchTruck(searchbar) {
    this.reftruck.on('value', resp => {
      this.filteredtrucks = snapshotToArray(resp);
      console.log('mao',this.listTrucks);
      var q = searchbar.target.value;
      if (q.trim() == '') {
        return;
      }
      console.log('hahah',this.filteredtrucks);
      this.filteredtrucks = this.filteredtrucks.filter((v) => {
        if(v.id.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      })
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