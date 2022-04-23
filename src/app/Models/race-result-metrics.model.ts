export class RaceResultMetrics {
    raceId: number;
    userId: number;
    shoeId: number;
    raceName: string;
    distance: string;
    raceDate: Date;
    weather: string;
    description: string;
    location: string;
    timingCo: string;
    overallPlace: number;
    totalParticipants: number;
    age: number;
    ageGroupPlace: number;
    ageGroupParticipants: number;
    timeElapsed: string;
    pace: string;
    heartRate: number;
    elevationGain: number;
    cadence: number;

    constructor(userId: number, shoeId: number, raceName: string, distance: string, raceDate: Date, weather: string, description: string,  
        location: string, timingCo: string, overallPlace: number,totalParticipants: number, age: number, ageGroupPlace: number, 
        ageGroupParticipants: number, timeElapsed: string, pace: string, heartRate: number, elevationGain: number, cadence: number){
       this.userId = userId;
       this.shoeId = shoeId;
       this.raceName = raceName;
       this.distance = distance;
       this.raceDate = raceDate;
       this.weather = weather;
       this.description = description;
       this.location = location;
       this.timingCo = timingCo;
       this.overallPlace = overallPlace;
       this.totalParticipants = totalParticipants;
       this.age = age;
       this.ageGroupPlace = ageGroupPlace;
       this.ageGroupParticipants = ageGroupParticipants;
       this.timeElapsed = timeElapsed;  
       this.pace = pace; 
       this.heartRate = heartRate;
       this.elevationGain = elevationGain;
       this.cadence = cadence;      
    }
}
