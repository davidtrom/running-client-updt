import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RaceResult } from 'src/app/Models/race-result.model';

@Component({
  selector: 'app-manual-result',
  templateUrl: './manual-result.component.html',
  styleUrls: ['./manual-result.component.css']
})
export class ManualResultComponent implements OnInit {
  formNotValid: boolean;
  manualResultForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }
  addtlMetrics: boolean = false;

  ngOnInit(): void {
    this.manualResultForm = this.fb.group({
      raceName: ['', Validators.required],
      distance: ['', Validators.required],
      raceDate: ['', Validators.required],
      weather: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      timingCo: [''],
      overallPlace: ['', Validators.required],
      totalParticipants: ['', Validators.required],
      age: ['', Validators.required],
      ageGroupPlace: ['', Validators.required],
      ageGroupParticipants: [''],
      timeElapsed: ['', Validators.required],
      pace: ['',Validators.required],
      heartRate: [''],
      elevationGain: [''],
      cadence: ['']
    })
  }

  get form() { return this.manualResultForm.controls; }

  homePageRoute(){
    this.router.navigate(['results-home']);
  }

  showAddtlMetrics(){
    if(this.addtlMetrics = false){
      this.addtlMetrics = true;
    }
    else{
      this.addtlMetrics = false;
    }
  }

  onSubmit(){
    if(this.manualResultForm.valid){
      let manualResult: RaceResult= new RaceResult(
        this.manualResultForm.controls.raceName.value,
        this.manualResultForm.controls.distance.value,
        this.manualResultForm.controls.raceDate.value,
        this.manualResultForm.controls.weather.value,
        this.manualResultForm.controls.description.value,
        this.manualResultForm.controls.location.value,
        this.manualResultForm.controls.timingCo.value,
        this.manualResultForm.controls.overallPlace.value,
        this.manualResultForm.controls.totalParticipants.value,
        this.manualResultForm.controls.age.value,
        this.manualResultForm.controls.ageGroupPlace.value,
        this.manualResultForm.controls.ageGroupParticipants.value,
        this.manualResultForm.controls.pace.value,
        this.manualResultForm.controls.timeElapsed.value,
        this.manualResultForm.controls.heartRate.value,
        this.manualResultForm.controls.elevationGain.value,
        this.manualResultForm.controls.cadence.value
      )
    }
  }



}
