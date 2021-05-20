import { Component, OnInit, Input } from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service'
import {PageMeta} from '../../../../models/page-meta';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material';
import {PropertiesCardDComponent} from '../../../../share/card/properties-card-d/properties-card-d.component';
import {DocCardComponent} from '../../../../share/card/doc-card/doc-card.component';
@Component({
  selector: 'app-b-target-d',
  templateUrl: './b-target-d.component.html',
  styleUrls: ['./b-target-d.component.css']
})
export class BTargetDComponent implements OnInit {
  isLoading = true;
  arr=[];
  result1='';
  namet='';
  // obj:object;
  // arro=[]
  pageMeta: PageMeta | null;
  @Input() pageSizeOptions = [ 10,20,50,100];
  constructor(
    private restservice: RestService,
    private myrouter: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
    console.log(params);
    this.result1 = params.get('id');})
    if(this.result1.indexOf("T")!==-1){
      this.getData(0,10)
      this.getName(0,10)
  }
  else{
    this.getData2(0,10)
    this.namet=this.result1
  }
  }
  getData(page, perPage){
    this.restservice.getDataList(`DerAct/?target_id=${this.result1}`, page, perPage)
    .subscribe(data => {
      this.arr=data['mol_act_relateds'],
      this.pageMeta=data['meta']
      console.log(this.arr)
      // for(var i=0;i<data['n_passays'].length;i++){
      //   this.restservice.getDataList(`YNpDbLocal/?database_id=${this.arr[i]['database_id']}`, page, perPage)
      //   .subscribe(data =>{
      //     this.obj=data['np_db_locals'][0]
      //     this.arro.push(this.obj)
      //     console.log(this.obj)
      //   })
      // }
      this.isLoading = false; 
    });
  }
  getData2(page, perPage){
    this.restservice.getDataList(`DerAct/?assay_id=${this.result1}`, page, perPage)
    .subscribe(data => {
      this.arr=data['mol_act_relateds'],
      this.pageMeta=data['meta']
      console.log(this.arr)
      this.isLoading = false; 
    });
  }
  getName(page, perPage){
    this.restservice.getDataList(`TargetInfo/?tid=${this.result1}`, page, perPage)
    .subscribe(data => {
    this.namet = data['target_info_news'][0]['name'];
    console.log(this.namet);
    });
  }
  openMoleculePropertiesDialog(moleculeChemblId: number | string) {
    this.dialog.open(PropertiesCardDComponent, {
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
  pageChange(event) {
    this.isLoading = true;
    if(this.result1.indexOf("T")!==-1){
      this.getData(event.pageIndex, event.pageSize);
  }
  else{
    this.getData2(event.pageIndex, event.pageSize);
  }
}
}
