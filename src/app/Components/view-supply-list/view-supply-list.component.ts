import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlertPromise } from 'selenium-webdriver';
import { ListItem } from 'src/app/Models/list-item.model';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { ListsService } from 'src/app/Services/lists.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  newItem: ListItem;
  itemExists: boolean;
  baseUrl = environment.baseUrl + "/supply-lists";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }
  faPencilAlListItem;t = faPencilAlt; 


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private listService: ListsService, private router: Router, private http: HttpClient) {
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

    this.route.params.subscribe(routeParams => {
      this.supplyListId = routeParams.id;
      this.listService.getListById(+(routeParams.id)).subscribe(data => {this.listToDisplay = data;
      this.listItems = this.listToDisplay.items;});
      console.log("List Items: ", this.listToDisplay.items);
      console.log("First item: ", this.listToDisplay.items[0]);
    });

    this.newItemForm = this.fb.group({
      newItemName: ['', Validators.required]
    });

    this.userId = 1;

    this.listService.getUserLists(this.userId).subscribe(data => {
      this.userLists = data;
    });
  }

  get form() {return this.newItemForm.controls;}

  showNewList(id:number){
    this.listService.getListById(id).subscribe(data => {this.listToDisplay = data;});
      console.log(this.listToDisplay.listDescription);
      console.log("Inside show new List", this.listToDisplay.items.length);
      //console.log("First item: ", this.listToDisplay.items[0].itemDescription);
      // for(let i = 0; i < this.listToDisplay.items.length; i++){
      //   console.log("Items");
      //   this.listItems.push(this.listToDisplay.items[i])
      // }
      this.listItems = this.listToDisplay.items;
      console.log("List Items: ", this.listItems);
  }

  async showNewListAlt(listId: number){
    //listToDisplayAlt: SupplyList;
    //const listToDisplayAlt = await firstValueFrom(this.http.post<SupplyList>(this.baseUrl+`/add-item/${listId}`, itemDescription, this.httpOptions))
    const listToDisplayAlt = await this.http.get<SupplyList>(this.baseUrl+`/${listId}`);
  }

  onSubmit(){
    if(this.newItemForm.controls.newItemName.value == ""){
      this.blankItem = true;
    }
    // 
    for(let i = 0; i < this.listItems.length; i++){
      console.log("inside for loop", this.listItems[i]);
      if(this.newItemForm.controls.newItemName.value === this.listItems[i])
      this.itemExists = true;
      console.log(this.itemExists);
    }
    
    this.listService.addItem(this.listToDisplay.id, this.newItemForm.controls.newItemName.value)
      .subscribe(data => {
          console.log('new item created');
          this.listToDisplay = data;
          this.listItems = this.listToDisplay.items;
          //this.listNotCreated = false;
          //this.showGif = true;
          // setTimeout(() => {
          //   console.log('sleep');
          //   this.router.navigate(['/edit-list', this.supplyList.id]);
          //   // And any other code that should run only after 5s
          //   //add list_id to array to send to supply-lists
          // }, 4000);
        }
        
       )
  }

  // async onSubmit(){
  //   myListToDisplay: SupplyList = await this.listService.addItem(this.listToDisplay.id, this.newItemForm.controls.newItemName.value);
    
  //       if (this.listToDisplay == null){
  //         this.itemExists = true;
  //       }
  //       else {
  //         console.log('new item created');
  //         this.listToDisplay = data;
  //         this.listItems = this.listToDisplay.items;
  //         //this.listNotCreated = false;
  //         //this.showGif = true;
  //         // setTimeout(() => {
  //         //   console.log('sleep');
  //         //   this.router.navigate(['/edit-list', this.supplyList.id]);
  //         //   // And any other code that should run only after 5s
  //         //   //add list_id to array to send to supply-lists
  //         // }, 4000);
  //       } 
  //   }
  

  addItem(){
    console.log("I currently do nothing");
    // this.newItem = {itemDescription: this.listItem.itemDescription};
    // this.listService.addItem(listId, this.newItem).subscribe(data => {
    //   this.listToDisplay = data;
    // })
  }

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
function firstValueFrom(): SupplyList | PromiseLike<SupplyList> {
  throw new Error('Function not implemented.');
}

