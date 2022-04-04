export class RaceResult {
    raceId: number;
    userId: number;
    shoeId: number;
    raceName: string;
    distance: string;
    weather: string;
    description: string;
    location: string;
    timingCo: string;
    overallPlace: number;
    totalParticipants: number;
    age: number;
    ageGroupPlace: number;
    ageGroupParticipants: number;
    pace: string;
    timeElapsed: string;
    heartRate: number;
    elevationGain: number;
    cadence: number;

    constructor(raceName: string, distance: string, weather: string, description: string, location: string, timingCo: string, overallPlace: number, 
        totalParticipants: number, age: number, ageGroupPlace: number, ageGroupParticipants: number, pace: string, timeElapsed: string){
       this.raceName = raceName;
       this.distance = distance;
       this.weather = weather;
       this.description = description;
       this.location = location;
       this.timingCo = timingCo;
       this.overallPlace = overallPlace;
       this.totalParticipants = totalParticipants;
       this.age = age;
       this.ageGroupPlace = ageGroupPlace;
       this.ageGroupParticipants = ageGroupParticipants;
       this.pace = pace;
       this.timeElapsed = timeElapsed;         
    }
}
