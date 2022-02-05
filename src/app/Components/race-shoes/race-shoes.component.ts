import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { RaceShoe } from 'src/app/Models/race-shoe.model';
import { ShoeService } from 'src/app/Services/shoe.service';

@Component({
  selector: 'app-race-shoes',
  templateUrl: './race-shoes.component.html',
  styleUrls: ['./race-shoes.component.css']
})
export class RaceShoesComponent implements OnInit {
  noShoes: boolean;
  activeShoes: RaceShoe[];
  retiredShoes: RaceShoe[] = [];
  allShoes: RaceShoe [] = [];
  showActive: boolean = true;
  showRetired: boolean = false;
  activeClicks: number = 0;
  retiredClicks: number = 0;


  //FOR TESTING PURPOSES:
  userId: number;

  constructor(private shoeService: ShoeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = 1;
    this.getUserShoes();
    //this.getRouteParams();
  }



  getUserShoes(){
    this.shoeService.getUserShoes(this.userId).subscribe(data => {
      this.allShoes = data;
      console.log("allShoes", data);
      if(this.allShoes.length == 0){
        this.noShoes = true;
      }
      else{
        this.getActiveShoes();
      }
    })
    console.log("All Shoes: ", this.activeShoes);
  }

  getActiveShoes(){
    this.showActive = true;
    this.showRetired = false;
    if(this.activeClicks === 0){
      this.shoeService.getActiveShoes(this.userId).subscribe(data => this.activeShoes = data);
      this.retiredClicks++;
      console.log(this.retiredClicks);
    }
  }

  getRetiredShoes(){
    this.showRetired = true;
    this.showActive = false;
    this.shoeService.getRetiredShoes(this.userId).subscribe(data => this.retiredShoes = data);
  }

  getRouteParams(){
    this.route.params.subscribe(routeParams => {
      this.userId = routeParams.userId;
      this.getUserShoes();
      });
  }

  addShoeRoute(){
    this.router.navigate(['add-shoe']);
  }

}
