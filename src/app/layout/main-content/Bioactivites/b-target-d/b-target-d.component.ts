import { Component, OnInit, Input } from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service'
import {PageMeta} from '../../../../models/page-meta';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material';
import {PropertiesCardComponent} from '../../../../share/card/properties-card/properties-card.component';

@Component({
  selector: 'app-b-target-d',
  templateUrl: './b-target-d.component.html',
  styleUrls: ['./b-target-d.component.css']
})
export class BTargetDComponent implements OnInit {
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
    this.getData(0,10)
    this.getName(0,10)
  }
  getData(page, perPage){
    this.restservice.getDataList(`DerAct/?target_id=${this.result1}`, page, perPage)
    .subscribe(data => {
      this.arr=data['der_act2s'],
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
    });
  }
  getName(page, perPage){
    this.restservice.getDataList(`TargetInfo/?target_id=${this.result1}`, page, perPage)
    .subscribe(data => {
    this.namet = data['target_info2s'][0]['name'];
    console.log(this.namet);
    });
  }
  openMoleculePropertiesDialog(moleculeChemblId: number | string) {
    this.dialog.open(PropertiesCardComponent, {
      width: '800px',
      data: {
        moleculeChemblId: moleculeChemblId
      }
    })
  }
  pageChange(event) {
    this.getData( event.pageIndex, event.pageSize);
  }
}
