import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../../service/rest/rest.service';
@Component({
  selector: 'app-target-card',
  templateUrl: './target-card.component.html',
  styleUrls: ['./target-card.component.css']
})
export class TargetCardComponent implements OnInit {
  str;
  shuzu=[];
  targetinf;
  constructor(
    public dialogRef: MatDialogRef<TargetCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
  ) { }
  ngOnInit() {
    this.rest.getDataList(`TargetInfo/?tid=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.targetinf = data['target_info_news'][0];
      if(data['target_info_news'][0]['uniprot_id']){
        this.str=data['target_info_news'][0]['uniprot_id']
        this.shuzu=this.str.split('|')
        console.log(this.shuzu)
      }
      console.log(this.targetinf);
    });
  }

}
