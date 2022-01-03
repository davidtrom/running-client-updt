import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplyList } from 'src/app/Models/supply-list.model';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-create-supply-list',
  templateUrl: './create-supply-list.component.html',
  styleUrls: ['./create-supply-list.component.css']
})
export class CreateSupplyListComponent implements OnInit {
  newListForm: FormGroup;
  listName: string;
  userId: number;
  supplyList: SupplyList;
  listNotCreated: boolean = true;
  showGif: boolean;
  listExists: boolean = false;

  constructor( private fb: FormBuilder, private router: Router, private listService: ListsService) { }

  ngOnInit(): void {
    this.userId = 1;

    this.newListForm = this.fb.group({
      listName: ['', Validators.required]
    });
  }

  get form() {return this.newListForm.controls;}
  
  submitListName(){
    this.listName = this.newListForm.controls.listName.value
  }

  onSubmit(){
    this.listService.createNewList(this.userId, this.newListForm.controls.listName.value)
      .subscribe(data => {
        if (data == null){
          this.listExists = true;
        }
        else {
          console.log('new list created');
          this.supplyList = data;
          this.listNotCreated = false;
          this.showGif = true;
          setTimeout(() => {
            console.log('sleep');
            this.router.navigate(['/view-list', this.supplyList.id]);
            // And any other code that should run only after 5s
            //add list_id to array to send to supply-lists
          }, 5000);
        }
        
       })
  }
  
  createNewList(){

  }

}
