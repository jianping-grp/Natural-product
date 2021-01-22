import {Component, Inject, OnInit} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
// import {Compound} from '../../../yatcm/models/compound';
import {Router} from '@angular/router';

@Component({
  selector: 'app-compound-card',
  templateUrl: './compound-card.component.html',
  styleUrls: ['./compound-card.component.css']
})
export class CompoundCardComponent implements OnInit {
  // compound: Compound;  
  moleculeStructure;
  arr1;
  arr2;
  prescriptionId: number;
  diseaseId: number;
  constructor(private rest: RestService,
              public dialogRef: MatDialogRef<CompoundCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) {

  }

  ngOnInit() {
    if(this.data.moleculeChemblId.indexOf('N')!=-1){
      this.rest.getDataList(`NPChemInfo/?np_id=${this.data.moleculeChemblId}`)
      .subscribe(data => {
        this.arr1 = data['np_chem_info2s'][0];
        // this.drug = data;
        // this.pageMeta = data['meta'];
        console.log(this.moleculeStructure);
      })
      // this.rest.getDataList(`NPIdOtherdb/?np_id=${this.data.moleculeChemblId}`)
      // .subscribe(data => {
      //   this.arr2= data['np_id_otherdbs'][0];
      //   console.log(this.arr1);
      // });
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
      // this.rest.getDataList(`DerIdOtherdb/?der_id=${this.data.moleculeChemblId}`)
      // .subscribe(data => {
      //   this.arr2= data['der_id_otherdbs'][0];
      //   console.log(this.arr1);
      // });
    }
  }
  detail(event){
    console.log(event)
    if(this.data.moleculeChemblId.indexOf('N')!=-1){
      // this.rest.getDataList(`NPChemInfo/?np_id=${this.data.moleculeChemblId}`)
      // .subscribe(data => {
      //   this.arr1 = data['np_chem_info2s'][0];
      //   console.log(this.moleculeStructure);
      this.router.navigate(['/compound/',this.data.moleculeChemblId])
      // })


    }
    else{
      this.router.navigate(['/Derivative/',this.data.moleculeChemblId])
    }
  }
  kclose() {
    this.dialogRef.close();
  }

  // gotoCompoundNetwork() {
  //   this.router.navigate(['network-datatable/network'], {queryParams: {
  //     compoundId: this.data.compoundId
  //   }});
  // }
}
