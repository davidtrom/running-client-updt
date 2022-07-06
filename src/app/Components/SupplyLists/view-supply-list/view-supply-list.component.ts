import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListItem } from 'src/app/Models/list-item.model';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { ListsService } from 'src/app/Services/lists.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-view-supply-list',
  templateUrl: './view-supply-list.component.html',
  styleUrls: ['./view-supply-list.component.css']
})
export class ViewSupplyListComponent implements OnInit {
  newItemForm: FormGroup;
  editItemForm: FormGroup;
  editItemName = new FormControl('', Validators.required);
  listToDisplay: SupplyList;
  listItem: ListItem;
  listItems: ListItem[];
  userLists: SupplyList[];
  userId: number;
  supplyListId: string;
  newItem: string;
  itemExists: boolean = false;
  displayItems: string[];
  inAddItem: boolean = false;
  inEdit: boolean;
  isMobileResolution: boolean;
  justDeleteItem: boolean;
  deleteAllItems: boolean;
  listToDeleteItemFrom: number;
  itemToDeleteFromList: number
  itemDescriptionToDisplay: string;
  itemToEditDescription$: string = null;
  currentItemToEdit$: BehaviorSubject<string>;
  // currentItemToEdit$ = new Subject();
  noItemGiven: boolean;
  @ViewChild('box') inputItemText;
  itemToEdit$: string;
  

  //Turn off edit button if an item is crossed off?
  //Need an array for the ids of the items in the list to use in a map and then send for editing and updating


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private listService: ListsService, private router: Router) {
    this.currentItemToEdit$ = new BehaviorSubject<string>("");
    
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

    this.getObservableItem().subscribe(data => this.itemToEdit$ = data);

    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }

    this.getRouteParams();

    // this.newItemForm = this.fb.group({
    //   newItemName: ['', Validators.required],
    //   });
    

    this.editItemForm = this.fb.group({
      editItemName: [this.itemToEdit$, Validators.required]
    })

    this.userId = 1;

    this.listService.getUserLists(this.userId).subscribe(data => {
      this.userLists = data;
    });
  }

  get form() {return this.editItemForm.controls;}

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

  activateAddItem(){
    this.inAddItem = true;
  }

  deactivateAddItem(){
    this.inAddItem = false;
  }

  addNewItem(itemToAdd: string){
    this.itemExists = false;
    this.newItem = itemToAdd;
    if(this.newItem === "" || this.newItem === "Item to Add"){
      this.noItemGiven = true;
    }
    else{
      for(let i = 0; i < this.displayItems.length; i++){
        console.log("inside for loop", this.displayItems[i]);
        if(this.displayItems[i].toLowerCase() === this.newItem.toLowerCase()){
          this.itemExists = true;
          break;
        }
      }
      if(!this.itemExists){
        this.listService.addItem(this.listToDisplay.id, this.newItem)
        .subscribe(data => {
            console.log('new item created');
            this.listToDisplay = data;
            this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);
          }  
        )
        this.itemExists = false;
        this.noItemGiven = false;
        (document.getElementById("newItemBox") as HTMLInputElement).value = 'Item to Add';
      }
    }
  }

  onSubmit(){
    this.itemExists = false;
      if(this.editItemForm.valid){
        this.newItem =  this.newItemForm.get('newItemName').value;
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
      else{
        this.newItemForm.markAllAsTouched();
      }
  }

  editItemOn(incomingItem: string){
    this.inEdit = true;
    this.currentItemToEdit$.next(incomingItem);
    // this.currentItemToEdit$.subscribe(data => this.itemToEdit$ = data)
    this.setObservableItem(incomingItem);
    //console.log("IncomingItem: ", incomingItem);
    //this.getObservableItem().subscribe(data => this.itemToEdit$ = data);
    //this.itemToEditDescription$ = incomingItem;
    console.log("Item to edit: ", this.itemToEdit$);
    console.log("CurrentItemToEdit: ", this.currentItemToEdit$);
    
  }

  getObservableItem(): Observable<string>{
    return this.currentItemToEdit$.asObservable();
  }

  setObservableItem(incomingItem: string){
    console.log("IncomingItem: ", incomingItem);
    this.currentItemToEdit$.next(incomingItem);
  }

  editItemOff(){
    this.itemToEditDescription$ = null;
  }



  editSubmit(){
    console.log("Item: ", this.itemToEditDescription$);
    if(this.newItemForm.valid){
      console.log("Valid Form");
    }
  }

  deleteItem(){
    this.listService.deleteItem(this.listToDeleteItemFrom, this.itemToDeleteFromList).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);})
  }

  deleteItemOn(incomingListId: number, incomingItemId: number, incomingDescription: string){
    this.justDeleteItem = true;
    this.listToDeleteItemFrom = incomingListId;
    this.itemToDeleteFromList = incomingItemId;
    this.itemDescriptionToDisplay = incomingDescription;
  }

  deleteItemOff(){
    this.justDeleteItem = false;
    this.listToDeleteItemFrom = null;
    this.itemToDeleteFromList = null;
    this.itemDescriptionToDisplay = null;
  }

  deleteAllItemsOn(){
    this.deleteAllItems = true;
  }

  deleteAllItemsOff(){
    this.deleteAllItems = false;
  }

  strikethruItem(listId: number, itemId: number){
    this.listService.strikethruItem(listId, itemId).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);})
  }

  unstrikeAllItems(listId: number){
    this.listService.unstrikeAllItems(listId).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);})
  }

  clearItems(listId: number){
    this.listService.clearList(listId).subscribe(data => {
      this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);
    })
  }

  renameList(listId: number, listName: string){
    this.listService.setListNameToEdit(listName);
    this.router.navigate(['view-lists']);
    //set List names in list service and get list name in rename component
  }

  newListPath(){
    this.router.navigate(['new-list']);
  }

  closeEdit(){
    this.inAddItem = false;
  }

  // editSubmit(){
  //   console.log(this.editItemForm.get('editItemName').value);
    // this.itemExists = false;
    
    //   if(this.editItemForm.valid){
    //     this.newItem =  this.editItemForm.get('editItemName').value;
    //     for(let i = 0; i < this.displayItems.length; i++){
    //       console.log("inside for loop", this.displayItems[i]);
    //       if(this.displayItems[i].toLowerCase() === this.newItem.toLowerCase()){
    //         this.itemExists = true;
    //         this.editItemForm.reset();
    //         break;
    //       }
    //     }
    //     if(!this.itemExists){
    //     this.listService.addItem(this.listToDisplay.id, this.editItemForm.controls.newItemName.value)
    //       .subscribe(data => {
    //           console.log('new item created');
    //           this.listToDisplay = data;
    //           this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);
    //           this.editItemForm.reset();
    //         }  
    //       )
    //     }
    //     else {
    //       this.editItemForm.reset();
    //       return;
    //     }
    //   } 
    //   else{
    //     this.editItemForm.markAllAsTouched();
    //   }
  
  // }
}

