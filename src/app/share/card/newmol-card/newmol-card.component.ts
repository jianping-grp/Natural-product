import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../../service/rest/rest.service';
import {PageMeta} from '../../../models/page-meta';
import {Router} from '@angular/router';
@Component({
  selector: 'app-newmol-card',
  templateUrl: './newmol-card.component.html',
  styleUrls: ['./newmol-card.component.css']
})
export class NewmolCardComponent implements OnInit {
  moleculeStructure;
  name;
  arr1;
  arr2;
  pageMeta: PageMeta | null;
  constructor(
    public dialogRef: MatDialogRef<NewmolCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
              private router:Router
  ) { }

  ngOnInit() {
    this.rest.getDataList(`calcproperties/?mol="${this.data.moleculeChemblId}"`)
    .subscribe(data => {
      this.arr1 = data;
      // this.drug = data;
      // this.pageMeta = data['meta'];
      console.log(this.arr1);
    })
  }

  close() {
    this.dialogRef.close()
  }
}