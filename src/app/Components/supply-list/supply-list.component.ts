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
  status: boolean = false;
  updateList: boolean;
  listItem: ListItem;
  listItems: ListItem[];
  userLists: SupplyList[];
  supplyList: SupplyList;
  noSupplyLists: boolean;
  userId: number;
  collapsed: boolean = true;
  user: User;

  constructor(private listService: ListsService, private router:Router) { }

  ngOnInit(): void {
    this.userId = 1;

    this.listService.getUserLists(this.userId).subscribe(data => {
      this.userLists = data;
      this.checkForLists(this.userLists);
    });

    
  }

  collapse(): boolean{
    if(this.collapsed === true){
      this.collapsed = false;
    }
    else{
      this.collapsed = true;
    }
    return this.collapsed;
  }

  checkForLists(supplyLists: SupplyList[]) {
    if (supplyLists.length != 0){
      this.noSupplyLists = false;
    }
    else {
      this.noSupplyLists = true;
    }
  }

  
  
  onClick(){
      //this.listItems.push({name: this.listItem.name, strike: false});
      this.listItems.push({id: null, name: this.listItem.name});

  this.listItem.name = '';
  //this.listItem.id = 0;
   
  // this.listItem = {
  //     name: '',
  //     id: 0
  // };
}

onEdit(item){
  this.listItem = item;
}

onDelete(item){
  for(var i = 0;i < this.listItems.length; i++){
      if(item.id == this.listItems[i].id){
          this.listItems.splice(i,1);
          break;
      }
  }
}

// onStrike(item){
//   for(var i = 0;i < this.listItems.length; i++){
//     if(item.id == this.listItems[i].id){
//       if(this.listItems[i].strike){
//         this.listItems[i].strike = false;
//       }
//       else{
//         this.listItems[i].strike = true;
//       }
//       break;
//     }
//   }
// }

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
