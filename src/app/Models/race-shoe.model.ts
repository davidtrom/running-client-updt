
export class RaceShoe {
    id: number;
    userId: number;
    brand: string;
    model: string;
    shoeDescription: string;
    numOfMiles: number;
    beginUse: Date;
    isActive: boolean;

    constructor(userId: number, brand:string, model:string, shoeDescription: string, numOfMiles: number, beginUse: Date, isActive: boolean){
        this.userId = userId;
        this.brand = brand;
        this.model = model;
        this.shoeDescription = shoeDescription;
        this.numOfMiles = numOfMiles;
        this.beginUse = beginUse;
        this.isActive = isActive;
    }
}
