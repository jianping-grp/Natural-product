import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../../service/rest/rest.service';
import {PageMeta} from '../../../models/page-meta';
import {Router} from '@angular/router';
@Component({
  selector: 'app-properties-card',
  templateUrl: './properties-card.component.html',
  styleUrls: ['./properties-card.component.css']
})
export class PropertiesCardComponent implements OnInit {
  moleculeStructure;
  name;
  arr1;
  arr2;
  pageMeta: PageMeta | null;
  constructor(
    public dialogRef: MatDialogRef<PropertiesCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
              private router:Router
  ) { }

  ngOnInit() {
    if(this.data.moleculeChemblId.indexOf('N')!=-1){
    this.rest.getDataList(`NPChemInfo/?np_id=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.arr1 = data['np_chem_info2s'][0];
      // this.drug = data;
      // this.pageMeta = data['meta'];
      console.log(this.moleculeStructure);
    })
    this.rest.getDataList(`NPIdOtherdb/?np_id=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.arr2= data['np_id_otherdbs'][0];
      console.log(this.arr1);
    });
    // this.getNumNP(0,10)
  }
  else{
    this.rest.getDataList(`DerChemInfo/?der_id=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.arr1 = data['der_chem_info2s'][0];
      // this.drug = data;
      // this.pageMeta = data['meta'];
      console.log(this.moleculeStructure);
    })
    this.rest.getDataList(`DerIdOtherdb/?der_id=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.arr2= data['der_id_otherdbs'][0];
      console.log(this.arr1);
    });
  }
    // this.getNumDER(0,10)
  }
  // 获取化合物或衍生物相关的靶点个数
  // getNumNP(page,perPage){
  //   this.rest.getDataList(`TargetInfoNP/?np_id=${this.data.moleculeChemblId}`, page, perPage)
  //   .subscribe(data => {
  //     this.pageMeta=data['meta']
  //     console.log(this.pageMeta);
  // })}
  // getNumDER(page,perPage){
  //   this.rest.getDataList(`TargetInfoDer/?der_id=${this.data.moleculeChemblId}`, page, perPage)
  //   .subscribe(data => {
  //     this.pageMeta=data['meta']
  //     console.log(this.pageMeta);
  // })}
  // 跳转靶点信息列表页面
  // goTargetList(){
  //   this.router.navigate(['/target-table/','?mol_id='+this.data.moleculeChemblId])
  // }
  close() {
    this.dialogRef.close()
  }
}
