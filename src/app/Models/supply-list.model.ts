import { ListItem } from "./list-item.model";


export class SupplyList {
    id: number;
    listName: string
    listItems: ListItem[];

    constructor(id:number, listName:string, listItems:ListItem[]){
        this.id = id;
        this.listName = listName;
        this.listItems = listItems;
    }
}
