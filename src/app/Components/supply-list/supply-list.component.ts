import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { ListItem } from 'src/app/Models/list-item.model';
import { ListsService } from 'src/app/Services/lists.service';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-supply-list',
  templateUrl: './supply-list.component.html',
  styleUrls: ['./supply-list.component.css']
})
export class SupplyListComponent implements OnInit {
  status: boolean = false;
  updateList: boolean;
  listItem: ListItem;
  listItems = [];
  lists: any[];
  supplyList: SupplyList;
  newListForm: FormGroup;
  listName: string;

  constructor(private listService: ListsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getClientLists();
    this.newListForm = this.fb.group({
      listName: ['', Validators.required],
      listItem: ['', Validators.required]
    });
  }

  get form() {return this.newListForm.controls;}

  submitListName(){
    this.listName = this.newListForm.controls.listName.value
  }

  submitNewList(){
    
    this.listService.createNewList(this.listName)
      .subscribe(data => console.log('new list created') )
  } 
  
  onClick(){
    if(this.listItem.id == 0){
      this.listItems.push({id: (new Date()).getTime(),name: this.listItem.name, strike: false});
  }

  this.listItem.name = '';
  this.listItem.id = 0;
   
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

onStrike(item){
  for(var i = 0;i < this.listItems.length; i++){
    if(item.id == this.listItems[i].id){
      if(this.listItems[i].strike){
        this.listItems[i].strike = false;
      }
      else{
        this.listItems[i].strike = true;
      }
      break;
    }
  }
}

getClientLists(){
  this.listService.getUserLists().subscribe(data => {this.lists = data});
}

}
