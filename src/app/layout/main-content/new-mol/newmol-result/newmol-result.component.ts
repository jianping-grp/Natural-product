import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../service/rest/rest.service';
@Component({
  selector: 'app-newmol-result',
  templateUrl: './newmol-result.component.html',
  styleUrls: ['./newmol-result.component.css']
})
export class NewmolResultComponent implements OnInit {
  isLoading = true;
result2:string;
num:number;
images=[];
result1:any;
displayedColumns: string[] = ['core','substructure','detail'];
  constructor(
    private myrouter: ActivatedRoute,
    private router:Router,
    private restservice: RestService ,
  ) {
    
   }

  ngOnInit() {
    this.myrouter.queryParams.subscribe(queryParams => {
      // console.log(queryParams);
      this.result1 =queryParams.structureType
      if(queryParams.structureType === 'MMP'){
        this.result2 = queryParams.smiles;
        
        // this.structureType =queryParams.structureType;
        console.log('daozhe')
        this._getNewmols(this.result2,0);
      }
      else if  (queryParams.structureType === 'Scaffold'){
      //   // this.result1 = queryParams.similarity;
        this.result2 = queryParams.smiles;
      //   this.structureType =queryParams.structureType;
         this._getNewmols2(this.result2,0);
      }
    });
  }
  private _getNewmols(sea?,page?) {   
    this.restservice.getDataList2(`MolFragExchange/?mol='${sea}'`,page)
    .subscribe(data => {
      console.log(data)
      this.images=data['results']
      this.num = data['count']
      console.log(this.num)  
      this.isLoading = false;   
    });
  }
  private _getNewmols2(sea?,page?) {   
    this.restservice.getDataList2(`ScaffoldFragExchange/?mol='${sea}'`,page)
    .subscribe(data => {
      console.log(data)
      this.images=data['results']
      this.num = data['count']
      console.log(this.num)  
      this.isLoading = false; 
    });
  }
pageChange(event) {
  this.isLoading = true;
  if(this.result1=== 'MMP'){
    this._getNewmols(this.result2,event.pageIndex);
  }
  if(this.result1=== 'Scaffold'){
    this._getNewmols2(this.result2,event.pageIndex);
  }  
}
}
