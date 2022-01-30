import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListItem } from 'src/app/Models/list-item.model';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { ListsService } from 'src/app/Services/lists.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
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
  inEdit: boolean = true;
  itemToEdit: string = "";
  itemId: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private listService: ListsService, private router: Router) { }

  ngOnInit(): void {
    this.getRouteParams();

    this.editItemForm = this.fb.group({
      editItemName: [, Validators.required]
    })

    this.userId = 1;

    this.listService.getUserLists(this.userId).subscribe(data => {
      this.userLists = data;
    });
  }

  get form() {return this.editItemForm.controls;}

getRouteParams(){
  this.route.params.subscribe(routeParams => {
    this.supplyListId = routeParams.listId;
    console.log(this.supplyListId);
    this.itemId = routeParams.itemId;
    console.log(this.itemId);
    //GET ONE ITEM DESCRIPTION
    this.listService.getListById(+(routeParams.listId)).subscribe(data => {this.listToDisplay = data;
    this.showNewList(this.listToDisplay.id);
    });
  });
}

  showNewList(id:number){
    this.listService.getListById(id).subscribe(data => {this.listToDisplay = data;
      this.displayItems = this.listToDisplay.items.map(item => item.itemDescription);
      //this.router.navigate(['view-list', this.listToDisplay.id]);
    });
      console.log(this.listToDisplay.listDescription);
      console.log("Inside show new List", this.listToDisplay.items.length);
      console.log("List Items: ", this.listItems);
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

  editItem(itemDescription: string){
    //console.log("item to be edited: ", itemId);
    this.inEdit=true;
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

