import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EmailValidator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-mmp-card',
  templateUrl: './mmp-card.component.html',
  styleUrls: ['./mmp-card.component.css']
})
export class MmpCardComponent implements OnInit {
str=''
  constructor(private router: Router,
    public dialogRef: MatDialogRef<MmpCardComponent>,) { }
  contactForm: FormGroup;
  ngOnInit() {
    this.createForm();
  }
  get Smiles1() {return this.contactForm.get('Smiles1'); }
  get Smiles2() {return this.contactForm.get('Smiles2'); }
  createForm() {
    this.contactForm = new FormGroup({
      Smiles1: new FormControl ('', [Validators.required, Validators.minLength(1)]),

      Smiles2: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })
  
  }
  onSubmit() {
    this.str=`?pk2="${this.contactForm.value.Smiles1}>>${this.contactForm.value.Smiles2}"`
    console.log(this.str)
    this.router.navigate(['/mmpd/', this.str
  ])
  }
  kclose() {
    this.dialogRef.close();
  }
}
