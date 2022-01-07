export class ListItem {
    id: number;
    itemDescription: string;
    listId: number;

    constructor(itemDescription:string, listId: number){
        this.itemDescription = itemDescription;
        this.listId = listId;
    }
}
