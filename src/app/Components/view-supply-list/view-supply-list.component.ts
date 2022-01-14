import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListItem } from 'src/app/Models/list-item.model';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { ListsService } from 'src/app/Services/lists.service';
import { faEraser, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-supply-list',
  templateUrl: './view-supply-list.component.html',
  styleUrls: ['./view-supply-list.component.css']
})
export class ViewSupplyListComponent implements OnInit {
  newItemForm: FormGroup;
  listToDisplay: SupplyList;
  listItem: ListItem;
  listItems: ListItem[];
  userLists: SupplyList[];
  userId: number;
  supplyListId: string;
  blankItem: boolean;
  testArray: ListItem[];
  testItem1: ListItem;
  testItem2: ListItem;
  testItem3: ListItem;
  newItem: string;
  itemExists: boolean = false;
  displayItems: string[];
  faEraser = faEraser;


  faPencilAltListItem = faPencilAlt; 
  //Need an array for the ids of the items in the list to use in a map and then send for editing and updating


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private listService: ListsService, private router: Router) {
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => {
  //     return false;
  //   }
  //   this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).forEach(next => { });  
   }

  ngOnInit(): void {
    // this.testItem1 = new ListItem("insoles", 50);
    // this.testItem2 = new ListItem("plane ticket", 50);
    // this.testItem3 = new ListItem("sunscreen", 50);
    // this.testArray = [this.testItem1, this.testItem2, this.testItem3];
    

    //this.testArray = ["insoles", "plane ticket", "sunscreen"];

    // this.route.params.subscribe(routeParams => {
    //   this.supplyListId = routeParams.id;
    //   this.listService.getListById(+(routeParams.id)).subscribe(data => {this.listToDisplay = data;
    //   this.listItems = this.listToDisplay.items;
    //   });
    //   this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);
    //   console.log("List Items: ", this.listToDisplay.items);
    //   console.log("First item: ", this.listToDisplay.items[0]);
    // });

    this.getRouteParams();

    this.newItemForm = this.fb.group({
      newItemName: ['', Validators.required]
    });

    this.userId = 1;

    this.listService.getUserLists(this.userId).subscribe(data => {
      this.userLists = data;
    });
  }

  get form() {return this.newItemForm.controls;}

getRouteParams(){
  this.route.params.subscribe(routeParams => {
    this.supplyListId = routeParams.id;
    this.listService.getListById(+(routeParams.id)).subscribe(data => {this.listToDisplay = data;
    this.showNewList(this.listToDisplay.id);
    });
  });
}

  showNewList(id:number){
    this.listService.getListById(id).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);});
      console.log(this.listToDisplay.listDescription);
      console.log("Inside show new List", this.listToDisplay.items.length);
      console.log("List Items: ", this.listItems);
  }

  onSubmit(){
    this.itemExists = false;
    this.newItem =  this.newItemForm.get('newItemName').value;
    if(this.newItem === ""){
      this.blankItem = true;
      return;
    }
    for(let i = 0; i < this.displayItems.length; i++){
      console.log("inside for loop", this.displayItems[i]);
      if(this.displayItems[i].toLowerCase() === this.newItem.toLowerCase()){
        this.itemExists = true;
        this.newItemForm.reset();
        break;
    }
  }
    if(!this.itemExists){
    this.listService.addItem(this.listToDisplay.id, this.newItemForm.controls.newItemName.value)
      .subscribe(data => {
          console.log('new item created');
          this.listToDisplay = data;
          this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);
          this.newItemForm.reset();
        }  
      )
    }
    else {
      this.newItemForm.reset();
      return;
    }
  }

  deleteItem(itemId:number){
    // console.log("delete item id ", itemId);
    // this.listService.deleteItem(itemId)
  }

  // isItemInList(){

  // }

  // cancel(){

  // }



  goEdit(){
    this.router.navigate(['edit-list', this.listToDisplay.id]);
  }

  editItem(itemId: number){
    console.log("item to be edited: ", itemId);
  }


  onClick(){
    //this.listService.addItem()
    //this.testArray.push()
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

