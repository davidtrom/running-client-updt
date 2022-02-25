import { Gender } from "./Gender";
import { ProfileStatus } from "./ProfileStatus";

export class EditUser {
    userId:number;
    firstName: string;
    lastName: string;
    birthday: Date;
    locationCity: string;
    locationState: string;
    locationCountry: string;
    gender: Gender;
    profileStatus: ProfileStatus;


    constructor(userId:number, firstName: string, lastName: string, birthday: Date, locationCity: string, locationState: string, locationCountry: string, gender: Gender, profileStatus: ProfileStatus){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName
        this.birthday = birthday;
        this.locationCity = locationCity;
        this.locationState = locationState;
        this.locationCountry = locationCountry;
        this.gender = gender;
        this.profileStatus = profileStatus;
    }
}
