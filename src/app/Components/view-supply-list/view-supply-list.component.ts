import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListItem } from 'src/app/Models/list-item.model';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { ListsService } from 'src/app/Services/lists.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-supply-list',
  templateUrl: './view-supply-list.component.html',
  styleUrls: ['./view-supply-list.component.css']
})
export class ViewSupplyListComponent implements OnInit {
  newItemForm: FormGroup;
  editItemForm: FormGroup;
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
  inEdit: boolean = false;
  //favicons
  // faEraser = faEraser;
  // faTrashAlt = faTrashAlt;
  // faPencilAlt = faPencilAlt;
  // faCheckSquare = faCheckSquare;


  //While loop for blank item
  //Turn off edit button if an item is crossed off?
  //Need an array for the ids of the items in the list to use in a map and then send for editing and updating


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private listService: ListsService, private router: Router) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // }
    // this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).forEach(next => { });  
   }

  ngOnInit(): void {

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

  // can try here to do if inEdit = true then return return this.editItemForm.controls;?
  get form() {return this.newItemForm.controls;}

  //get editForm() {return this.editItemForm.controls;}

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
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);
      this.router.navigate(['view-list', this.listToDisplay.id]);});
      console.log(this.listToDisplay.listDescription);
      console.log("Inside show new List", this.listToDisplay.items.length);
      console.log("List Items: ", this.listItems);
  }

  onSubmit(){
    //while loop for while this.newItem = ""
    this.itemExists = false;
    this.newItem =  this.newItemForm.get('newItemName').value;
    // if(this.newItem == ""){
    //   this.blankItem = true;
    //   this.newItemForm.reset();
    //   return;
    // }
    while (this.newItem == ""){
      this.blankItem = true;
      if(this.newItem != ""){
        this.blankItem = false;
        break;
      }
    }
    for(let i = 0; i < this.displayItems.length; i++){
      // this.blankItem = false;
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

  deleteItem(listId: number, itemId:number){
    this.listService.deleteItem(listId, itemId).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);})
  }

  strikethruItem(listId: number, itemId: number){
    this.listService.strikethruItem(listId, itemId).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);})
  }

  editItem(){
    //console.log("item to be edited: ", itemId);
    this.inEdit=true;
  }

  // editSubmit(){
  //   this.editItemForm = this.fb.group({
  //     newItemName: ['', Validators.required]
  //   });
  // }

  // cancel(){}




  goEdit(){
    this.router.navigate(['edit-list', this.listToDisplay.id]);
  }
}

