import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../../service/rest/rest.service';
import {PageMeta} from '../../../models/page-meta';
import {Router} from '@angular/router';
@Component({
  selector: 'app-properties-card-d',
  templateUrl: './properties-card-d.component.html',
  styleUrls: ['./properties-card-d.component.css']
})
export class PropertiesCardDComponent implements OnInit {
  moleculeStructure;
  name;
  arr1;
  arr2;
  pageMeta: PageMeta | null;
  constructor(
    public dialogRef: MatDialogRef<PropertiesCardDComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
              private router:Router
  ) { }

  ngOnInit() {
    console.log(this.data.moleculeChemblId);
    if(this.data.moleculeChemblId.indexOf('N')!=-1){
    this.rest.getDataList(`NPChemInfo/?mol_id=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.arr1 = data['mol_chem_info_alls'][0];
      // this.drug = data;
      // this.pageMeta = data['meta'];
     
    })
    this.rest.getDataList(`MolIdOtherdb/?mol_id=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.arr2= data['mol_id_otherdbs'][0];
      console.log(this.arr1);
    });
    // this.getNumNP(0,10)
  }
  else{
    this.rest.getDataList(`DerChemInfo/?mol_id=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.arr1 = data['mol_chem_info_alls'][0];
      // this.drug = data;
      // this.pageMeta = data['meta'];
      console.log(this.arr1);
      console.log(this.moleculeStructure);
    })
    this.rest.getDataList(`MolIdOtherdb/?mol_id=${this.data.moleculeChemblId}`)
    .subscribe(data => {
      this.arr2= data['mol_id_otherdbs'][0];
      
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
  // tiaozhuan(id){
  //   this.router.navigate(['/compound/',id])
  //   this.dialogRef.close()
  // }
  close() {
    this.dialogRef.close()
  }
}
