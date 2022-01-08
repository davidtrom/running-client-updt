export class ListItem {
    id: number;
    itemDescription: string;
    listId: number;
    strikethru: boolean;

    constructor(itemDescription:string, listId: number){
        this.itemDescription = itemDescription;
        this.listId = listId;
    }
}
