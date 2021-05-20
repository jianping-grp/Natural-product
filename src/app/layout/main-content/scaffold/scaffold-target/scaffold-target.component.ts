import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../service/rest/rest.service';
import {MatDialog} from '@angular/material';
import {DocCardComponent} from '../../../../share/card/doc-card/doc-card.component'
import {PageMeta} from '../../../../models/page-meta';
@Component({
  selector: 'app-scaffold-target',
  templateUrl: './scaffold-target.component.html',
  styleUrls: ['./scaffold-target.component.css']
})
export class ScaffoldTargetComponent implements OnInit {
  isLoading = true;
  str;
  result2:string;
  num:number;
  images:[];
  result1:any;
  target
  meta:PageMeta[];
  displayedColumns: string[] = ['mol_id','assay_id','target_id','activity_type','activity_value','doc_id'];
    constructor(
      private myrouter: ActivatedRoute,
      public dialog: MatDialog,
      private router:Router,
      private restservice: RestService ,
    ) {
      
     }
  
    ngOnInit() {
      this.myrouter.queryParams.subscribe(queryParams => {
        console.log(queryParams);
        this.result1 =queryParams.structureType
        
        if(queryParams.structureType === 'framwork'){
          this.result2 = queryParams.smiles;
          this.target =queryParams.sea
          // this.structureType =queryParams.structureType;
          this._getDrugs(this.result2,this.target,0);
        }
        else if  (queryParams.structureType === 'scaffold'){
        //   // this.result1 = queryParams.similarity;
          this.result2 = queryParams.smiles;
          this.target =queryParams.sea
        //   this.structureType =queryParams.structureType;
           this._getDrugs2(this.result2,this.target,0);
        }
  
      });
    }
    private _getDrugs(sea?,target?,page?) {
      console.log(sea+target)
      this.restservice.getDataList2(`CoreSearch/?generic_framework=${sea}&target_id=${target}`,page)
      .subscribe(data => {
        console.log(data)
        // if(){

        // }
        this.images=data['core_searches']
        this.num = data['count']
        this.isLoading = false; 
        console.log(this.images)
       
      });
  }
  private _getDrugs2(sea?,target?,page?) {
    console.log(target)
    this.restservice.getDataList2(`CoreSearch/?scaffold_smiles=${sea}&target_id=${target}`,page)
    .subscribe(data => {
      console.log(1)
      console.log(data)
      this.images=data['mol_act_relateds']
      // this.images=JSON.parse(this.str)

      console.log(this.images)
      this.num =this.images.length
      this.isLoading = false; 
      // console.log(this.num)
     
    });
  }
  pageChange(event) {
    this.isLoading = true;
    if(this.result1=== 'framwork'){
      this._getDrugs(this.result2,event.pageIndex);
    }
    if(this.result1=== 'scaffold'){
      this._getDrugs2(this.result2,event.pageIndex);
    }
    
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
