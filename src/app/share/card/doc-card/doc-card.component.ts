import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../../service/rest/rest.service';
@Component({
  selector: 'app-doc-card',
  templateUrl: './doc-card.component.html',
  styleUrls: ['./doc-card.component.css']
})
export class DocCardComponent implements OnInit {
  str;
  shuzu=[];
  docinf;
  constructor(
    public dialogRef: MatDialogRef<DocCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
  ) { }
  ngOnInit() {
    this.rest.getDataList(`docinfo/?doc_id=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.docinf = data['doc_infos'][0];
      // if(data['target_info_news'][0]['uniprot_id']){
      //   this.str=data['target_info_news'][0]['uniprot_id']
      //   this.shuzu=this.str.split('|')
      //   console.log(this.shuzu)
      // }
      // console.log(this.targetinf);
    });
  }

}
