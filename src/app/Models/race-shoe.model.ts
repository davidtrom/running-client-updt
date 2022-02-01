
export class RaceShoe {
    id: number;
    userId: number;
    brand: string;
    model: string;
    numOfMiles: number;
    beginUse: Date;
    isActive: boolean;
    shoeDescription: string;

    constructor(userId: number, brand:string, model:string, numOfMiles: number, beginUse: Date, isActive: boolean, shoeDescription: string){
        this.userId = userId;
        this.brand = brand;
        this.model = model;
        this.numOfMiles = numOfMiles;
        this.beginUse = beginUse;
        this.isActive = isActive;
        this.shoeDescription = shoeDescription;
    }
}
