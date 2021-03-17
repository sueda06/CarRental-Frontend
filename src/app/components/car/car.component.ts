import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  dataLoaded=false; carImages:CarImage;
  apiUrl = "https://localhost:4310";
  carImageDefault="https://localhost:4310/images/default.jpg"
  currentCarImage:CarImage;
 
  constructor(private carService:CarService,private activatedRouted:ActivatedRoute,
    private carImageService:CarImageService) { }

  ngOnInit(): void {
   this.activatedRouted.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"])
      }
      else{
        this.getCars()
      }
   })
  }
  getCars(){
    this.carService.getCars().subscribe(response => {
    this.cars=response.data;
    this.dataLoaded=true;
   })
 }
 getCarsByBrandId(brandId:number){
  this.carService.getCarsByBrandId(brandId).subscribe(response => {
  this.cars=response.data;
  this.dataLoaded=true;
 })
}
getCarsByColorId(colorId:number){
  this.carService.getCarsByColorId(colorId).subscribe(response => {
  this.cars=response.data;
  this.dataLoaded=true;
 })
}
getCarsImages(){
  this.carImageService.getCarsImages()
}
}
