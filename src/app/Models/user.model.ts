
export class User {
    id:number;
    firstName: string;
    lastName: string;
    birthday: Date;
    email: string;
    password: string;
    publicStatus: boolean;


    constructor( firstName: string, lastName: string, birthday: Date, email: string, password: string, publicStatus: boolean){
        this.firstName = firstName;
        this.lastName = lastName
        this.birthday = birthday;
        this.email = email;
        this.password = password;
        this.publicStatus = publicStatus;
    }
}
