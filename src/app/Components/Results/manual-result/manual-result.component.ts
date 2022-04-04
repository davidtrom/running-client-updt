import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual-result',
  templateUrl: './manual-result.component.html',
  styleUrls: ['./manual-result.component.css']
})
export class ManualResultComponent implements OnInit {
  formNotValid: boolean;
  manualResultForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.manualResultForm = this.fb.group({
      raceName: ['', Validators.required],
      distance: ['', Validators.required],
      weather: ['', Validators.required],
      
      age: ['', [Validators.required, Validators.pattern("")]],  //NEED REGEX FOR ONLY NUMBER PATTERN


    })
  }

  get form() { return this.manualResultForm.controls; }

  homePageRoute(){
      
  }

  onSubmit(){

  }



}
