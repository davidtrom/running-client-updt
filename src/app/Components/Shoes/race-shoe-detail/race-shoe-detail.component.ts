import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RaceShoe } from 'src/app/Models/race-shoe.model';
import { ShoeService } from 'src/app/Services/shoe.service';

@Component({
  selector: 'app-race-shoe-detail',
  templateUrl: './race-shoe-detail.component.html',
  styleUrls: ['./race-shoe-detail.component.css']
})
export class RaceShoeDetailComponent implements OnInit {
  userShoes: RaceShoe[];
  shoeToDisplay: RaceShoe;
  myShoeId: number;

  //USED FOR TESTING:
  userId: number;

  constructor(private router: Router, private route: ActivatedRoute, private shoeService: ShoeService) { }

  ngOnInit(): void {
    this.userId = 1;

    this.shoeService.getUserShoes(this.userId).subscribe(data => {
      this.userShoes = data;
    });

    this.getRouteParams();
  }

  getRouteParams(){
    this.route.params.subscribe(routeParams => {
      this.shoeService.getShoeById(+(routeParams.shoeId)).subscribe(data => {this.shoeToDisplay = data;
      console.log("Shoe to Display: ", this.shoeToDisplay);
      this.router.navigate(['shoe-detail', this.shoeToDisplay.shoeId]);})
      
      // this.showNewShoe(this.shoeToDisplay.shoeId);
      });
  }


  showNewShoe(id:number){
    this.shoeService.getShoeById(id).subscribe(data => {this.shoeToDisplay = data;
      // this.router.navigate(['shoe-detail', id]);
    });
  }

  mainShoesRoute(){
    this.router.navigate(['race-shoes']);
  }

}
