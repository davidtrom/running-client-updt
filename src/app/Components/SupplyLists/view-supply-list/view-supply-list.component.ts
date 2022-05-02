import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListItem } from 'src/app/Models/list-item.model';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { ListsService } from 'src/app/Services/lists.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


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
  inEdit: boolean = false;
  isMobileResolution: boolean;
  //itemToEdit: string = "";
  //favicons
  // faEraser = faEraser;
  // faTrashAlt = faTrashAlt;
  // faPencilAlt = faPencilAlt;
  // faCheckSquare = faCheckSquare;

  //Uncheck all button


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

    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }

    this.getRouteParams();

    this.newItemForm = this.fb.group({
      newItemName: ['', Validators.required],
      });
    

    // this.editItemForm = this.fb.group({
    //   editItemName: ['', Validators.required]
    // })

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
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);
      this.router.navigate(['view-list', this.listToDisplay.id]);});
      console.log(this.listToDisplay.listDescription);
      console.log("Inside show new List", this.listToDisplay.items.length);
      console.log("List Items: ", this.listItems);
  }

  activateAddItem(){
    this.inEdit = true;
  }

  deactivateAddItem(){
    this.inEdit = false;
  }

  onSubmit(){
    this.itemExists = false;
    
      if(this.newItemForm.valid){
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

  deleteItem(listId: number, itemId:number){
    this.listService.deleteItem(listId, itemId).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);})
  }

  strikethruItem(listId: number, itemId: number){
    this.listService.strikethruItem(listId, itemId).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);})
  }

  unstrikeAllItems(listId: number){
    this.listService.unstrikeAllItems(listId).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);})
  }

  editItem(listId: number, itemName: number, itemDescription: string){
    console.log("item to be edited: ", itemName);
    console.log("list to be edited: ", listId);
    // this.router.navigate(['edit-list', listId, itemId]);
    
    this.listService.setListItemToEdit(itemDescription);
    this.router.navigate(['edit-item'])
    
    console.log("itemDescription: ", itemDescription)
    this.inEdit=true;
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
    this.inEdit = false;
  }

  editSubmit(){
    console.log(this.editItemForm.get('editItemName').value);
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
  
  }

  cancel(){
    this.inEdit = false;
  }

  goEdit(){
    this.router.navigate(['edit-list', this.listToDisplay.id]);
  }
}

