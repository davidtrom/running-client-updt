import { ListItem } from "./list-item.model";


export class SupplyList {
    id: number;
    userId: number;
    listDescription: string
    items: ListItem[];

    constructor(id:number, userId: number, listDescription:string, items:ListItem[]){
        this.id = id;
        this.userId = userId;
        this.listDescription = listDescription;
        this.items = items;
    }
}
