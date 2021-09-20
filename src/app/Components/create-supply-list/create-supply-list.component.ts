import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-create-supply-list',
  templateUrl: './create-supply-list.component.html',
  styleUrls: ['./create-supply-list.component.css']
})
export class CreateSupplyListComponent implements OnInit {
  newListForm: FormGroup;
  listName: string;

  constructor( private fb: FormBuilder, private router: Router, private listService: ListsService) { }

  ngOnInit(): void {
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

}
