import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { ListItem } from 'src/app/Models/list-item.model';
import { ListsService } from 'src/app/Services/lists.service';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-supply-list',
  templateUrl: './supply-list.component.html',
  styleUrls: ['./supply-list.component.css']
})
export class SupplyListComponent implements OnInit {
  userLists: SupplyList[];
  supplyList: SupplyList;
  noSupplyLists: boolean;
  userId: number;
  //user: User;

  constructor(private listService: ListsService, private router:Router) { }
  isMobileResolution: boolean;

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }

    this.userId = 1;

    this.listService.getUserLists(this.userId).subscribe(data => {
      this.userLists = data;
      this.checkForLists(this.userLists);
    });

    
  }

  checkForLists(supplyLists: SupplyList[]) {
    if (supplyLists.length != 0){
      this.noSupplyLists = false;
    }
    else {
      this.noSupplyLists = true;
    }
  }

getMyUserLists(id:number){
  this.listService.getUserLists(id).subscribe(data => {
    this.userLists = data;
    console.log("userLists: ", this.userLists.length);
    if(this.userLists.length === 0){
      this.noSupplyLists = true;
    }
    else{
      this.noSupplyLists = false;
    }
  });
}

newListRoute(){
  this.router.navigate(['new-list']);
}

}
