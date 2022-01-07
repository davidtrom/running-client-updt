import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListItem } from 'src/app/Models/list-item.model';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-view-supply-list',
  templateUrl: './view-supply-list.component.html',
  styleUrls: ['./view-supply-list.component.css']
})
export class ViewSupplyListComponent implements OnInit {
  listToDisplay: SupplyList;
  listItem: ListItem;
  listItems: ListItem[];
  userLists: SupplyList[];
  userId: number;
  noSupplyLists: boolean;
  supplyListId: string;
  testArray: string[];
  testItem: string


  constructor(private route: ActivatedRoute, private listService: ListsService) { }

  ngOnInit(): void {
    // let supplyListId = +this.route.snapshot.paramMap.get('id');
    // console.log(supplyListId)
    this.testArray = ["insoles", "plane ticket", "sunscreen"];


    this.route.paramMap.subscribe(params => {
      this.supplyListId = params.get('id');
      this.listService.getListById(+(this.supplyListId)).subscribe(data => {this.listToDisplay = data});
      this.listItems = this.listToDisplay.listItems;
    });

    this.userId = 1;

    this.listService.getUserLists(this.userId).subscribe(data => {
      this.userLists = data;
      this.checkForLists(this.userLists);
    });

  }

  addItem(listId: number, item: string ){
    this.listService.addItem(listId, item).subscribe(data => {
      this.listToDisplay = data;
    })
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
    this.testArray.push()
    //this.listItems.push({name: this.listItem.name, strike: false});
    //this.listItems.push({id: null, name: this.listItem.name});

//this.listItem.name = '';
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


}
