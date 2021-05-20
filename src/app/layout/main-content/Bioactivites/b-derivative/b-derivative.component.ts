import { Component, OnInit, Input } from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {PageMeta} from '../../../../models/page-meta';
import {MatDialog} from '@angular/material';
import {TargetCardComponent} from '../../../../share/card/target-card/target-card.component';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DocCardComponent} from '../../../../share/card/doc-card/doc-card.component';
@Component({
  selector: 'app-b-derivative',
  templateUrl: './b-derivative.component.html',
  styleUrls: ['./b-derivative.component.css']
})
export class BDerivativeComponent implements OnInit {
  isLoading = true;
  arr  = [];
  result1 = 'D127771';
  pageMeta: PageMeta | null;
  @Input() pageSizeOptions =[ 10,20,50,100];;
  constructor(
    private restservice: RestService,
    public dialog: MatDialog,
    private myrouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');})
    this.getData(0,10)
    // this.getName(0,10)
  }
getData(page, perPage){
  this.restservice.getDataList(`DerAct/?mol_id=${this.result1}`, page, perPage)
  .subscribe(data => {
      this.arr=data['mol_act_relateds'],
      this.pageMeta=data['meta']
      console.log(this.arr)
      this.isLoading = false; 
  });
}
pageChange(event) {
  this.isLoading = true;
  this.getData( event.pageIndex, event.pageSize);
}
openMoleculePropertiesDialog(moleculeChemblId: number | string) {
  this.dialog.open(TargetCardComponent, {
    width: '800px',
    data: {
      moleculeChemblId: moleculeChemblId
    }
  })
}
openDocDialog(moleculeChemblId: number | string) {
  this.dialog.open(DocCardComponent, {
    width: '800px',
    data: {
      moleculeChemblId: moleculeChemblId
    }
  })
}
}
