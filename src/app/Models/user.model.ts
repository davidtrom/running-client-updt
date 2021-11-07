import { Gender } from "./Gender";
import { ProfileStatus } from "./ProfileStatus";

export class User {
    id:number;
    firstName: string;
    lastName: string;
    birthday: Date;
    email: string;
    locationCity: string;
    locationState: string;
    locationCountry: string;
    gender: Gender;
    password: string;
    profileStatus: ProfileStatus;


    constructor( firstName: string, lastName: string, birthday: Date, email: string, locationCity: string, locationState: string, locationCountry: string, gender: Gender, password: string, profileStatus: ProfileStatus){
        this.firstName = firstName;
        this.lastName = lastName
        this.birthday = birthday;
        this.email = email;
        this.locationCity = locationCity;
        this.locationState = locationState;
        this.locationCountry = locationCountry;
        this.gender = gender;
        this.password = password;
        this.profileStatus = profileStatus;
    }
}
