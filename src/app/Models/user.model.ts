import { ProfileStatus } from "./ProfileStatus";

export class User {
    id:number;
    firstName: string;
    lastName: string;
    birthday: Date;
    email: string;
    password: string;
    profileStatus: ProfileStatus;


    constructor( firstName: string, lastName: string, birthday: Date, email: string, password: string, profileStatus: ProfileStatus){
        this.firstName = firstName;
        this.lastName = lastName
        this.birthday = birthday;
        this.email = email;
        this.password = password;
        this.profileStatus = profileStatus;
    }
}
