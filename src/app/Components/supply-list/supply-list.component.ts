import { Component, OnInit } from '@angular/core';
import { ListItem } from 'src/app/Models/list-item.model';

@Component({
  selector: 'app-supply-list',
  templateUrl: './supply-list.component.html',
  styleUrls: ['./supply-list.component.css']
})
export class SupplyListComponent implements OnInit {
  listItem: ListItem;
  listItems = [];

  constructor() { }

  ngOnInit(): void {
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

}
