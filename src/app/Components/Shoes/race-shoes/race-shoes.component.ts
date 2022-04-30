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
  activeShoes: RaceShoe[] = [];
  retiredShoes: RaceShoe[] = [];
  allShoes: RaceShoe [] = [];
  showActive: boolean = true;
  showRetired: boolean = false;
  activeClicks: number = 0;
  retiredClicks: number = 0;
  activeShoesDemo: RaceShoe[]


  //FOR TESTING PURPOSES:
  userId: number;

  constructor(private shoeService: ShoeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = 1;
    this.getUserShoes();
    //this.getRouteParams();
  }

  getUserShoes(){
    //NEED TO SAVE THESE TO OBSERVABLES
    this.shoeService.getUserShoes(this.userId).subscribe(data => {
      this.allShoes = data;
      for(var i=0; i<this.allShoes.length; i++){
        if(this.allShoes[i].isActive){
          this.activeShoes.push(this.allShoes[i]);
        }
        else {
          this.retiredShoes.push(this.allShoes[i]);
        }
      }
      console.log("active Shoes: ", this.activeShoes);
      console.log("retired Shoes: ", this.retiredShoes);
      console.log("allShoes", data);
      if(this.allShoes.length == 0){
        this.noShoes = true;
      }
    })
    console.log("All Shoes: ", this.activeShoes);
  }



  // getUserShoes(){
  //   this.shoeService.getUserShoes(this.userId).subscribe(data => {
  //     this.allShoes = data;
  //     console.log("allShoes", data);
  //     if(this.allShoes.length == 0){
  //       this.noShoes = true;
  //     }
  //     else{
  //       this.getActiveShoes();
  //     }
  //   })
  //   console.log("All Shoes: ", this.activeShoes);
  // }

  // getActiveShoes(){
  //   this.showActive = true;
  //   this.showRetired = false;
  //   if(this.activeClicks === 0){
  //     this.shoeService.getActiveShoes(this.userId).subscribe(data => this.activeShoes = data);
  //     this.retiredClicks++;
  //     console.log(this.retiredClicks);
  //   }
  // }

  // getRetiredShoes(){
  //   this.showRetired = true;
  //   this.showActive = false;
  //   this.shoeService.getRetiredShoes(this.userId).subscribe(data => this.retiredShoes = data);
  // }

  // getRouteParams(){
  //   this.route.params.subscribe(routeParams => {
  //     this.userId = routeParams.userId;
  //     this.getUserShoes();
  //     });
  // }

  addShoeRoute(){
    this.router.navigate(['add-shoe']);
  }

}
