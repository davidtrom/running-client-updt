import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListItem } from 'src/app/Models/list-item.model';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  listToDisplay: SupplyList;
  listItem: ListItem;
  listItems: ListItem[];
  userLists: SupplyList[];
  userId: number;
  supplyListId: string;
  testArray: string[];
  testItem: string

  constructor(private route: ActivatedRoute, private listService: ListsService) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.supplyListId = params.get('listId');
    //   this.listService.getListById(+(this.supplyListId)).subscribe(data => {this.listToDisplay = data});
    //   this.listItems = this.listToDisplay.listItems;
    // });

    this.route.params.subscribe(routeParams => {
      this.supplyListId = routeParams.id;
      this.listService.getListById(+(routeParams.id)).subscribe(data => {this.listToDisplay = data;});
      this.listItems = this.listToDisplay.listItems;
    });

    this.userId = 1;

    this.listService.getUserLists(this.userId).subscribe(data => {
      this.userLists = data;
    });
  }

  update(id:number){
    this.listService.getListById(id).subscribe(data => {this.listToDisplay = data;});
      console.log(this.listToDisplay.listDescription);
      this.listItems = this.listToDisplay.listItems;
  }

  addItem(listId: number, item: string ){
    this.listService.addItem(listId, item).subscribe(data => {
      this.listToDisplay = data;
    })
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
