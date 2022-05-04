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
  noSupplyLists: boolean;
  supplyListId: string;
  userLists: SupplyList[];
  invalidForm: boolean;
  isMobileResolution: boolean;

  constructor( private fb: FormBuilder, private router: Router, private listService: ListsService) { }

  ngOnInit(): void {
    this.userId = 1;

    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }

    this.newListForm = this.fb.group({
      listName: ['', Validators.required]
    });

    this.listService.getUserLists(this.userId).subscribe(data => {
      this.userLists = data;
      this.checkForLists(this.userLists);
    });
  }

  get form() {return this.newListForm.controls;}
  
  submitListName(){
    this.listName = this.newListForm.controls.listName.value
  }

  checkForLists(supplyLists: SupplyList[]) {
    if (supplyLists.length != 0){
      this.noSupplyLists = false;
    }
    else {
      this.noSupplyLists = true;
    }
  }

  listsHomeRoute(){
    this.router.navigate(['supply-lists']);
  }

  onSubmit(){
    if(this.newListForm.valid){
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
              this.router.navigate(['/edit-list', this.supplyList.id]);
              // And any other code that should run only after 5s
              //add list_id to array to send to supply-lists
            }, 3000);
          }
      })
    }
    else{
      this.invalidForm = true;
      this.newListForm.reset();
    }
  }
  
}
