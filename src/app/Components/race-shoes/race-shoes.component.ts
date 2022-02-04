import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  //FOR TESTING PURPOSES:
  userId: number;

  constructor(private shoeService: ShoeService, private router: Router) { }

  ngOnInit(): void {
    this.userId = 1;

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
    for (let i = 0; i<this.allShoes.length; i++){
      console.log("in loop ", i);
      if(this.allShoes[i].isActive === true){
        this.activeShoes.push(this.allShoes[i]);
      }
      else{
        this.retiredShoes.push(this.allShoes[i]);
      }
    }
    console.log("Active Shoes: ", this.activeShoes);
    console.log("Retired Shoes: ", this.retiredShoes);
  }

  addShoeRoute(){
    this.router.navigate(['add-shoe']);
  }

}
