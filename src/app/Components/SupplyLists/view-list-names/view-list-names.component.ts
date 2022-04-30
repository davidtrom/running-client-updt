import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/Services/lists.service';

@Component({
  selector: 'app-view-list-names',
  templateUrl: './view-list-names.component.html',
  styleUrls: ['./view-list-names.component.css']
})
export class ViewListNamesComponent implements OnInit {

  constructor(private listService: ListsService) { }
  listName: string;

  ngOnInit(): void {
    this.listService.getListNameToEdit().subscribe(data => this.listName)
  }

}
