import { ListItem } from "./list-item.model";


export class SupplyList {
    id: number;
    userId: number;
    listDescription: string
    listItems: ListItem[];

    constructor(id:number, userId: number, listDescription:string, listItems:ListItem[]){
        this.id = id;
        this.userId = userId;
        this.listDescription = listDescription;
        this.listItems = listItems;
    }
}
