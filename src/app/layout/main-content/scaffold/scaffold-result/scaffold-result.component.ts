import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../service/rest/rest.service';
import {PageMeta} from '../../../../models/page-meta';
@Component({
  selector: 'app-scaffold-result',
  templateUrl: './scaffold-result.component.html',
  styleUrls: ['./scaffold-result.component.css']
})
export class ScaffoldResultComponent implements OnInit {
  isLoading = true;
  isLoading2 = true;
  result2:string;
  num:number;
  num2:number;
  images=[];
  result1:any;
  displayedColumns: string[] = ['core','Structure'];
  images2=[];
  displayedColumns2: string[] = ['id','name','num'];
  meta:PageMeta[];
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
        if(queryParams.structureType === 'framwork'){
          this.result2 = queryParams.smiles;
          
          // this.structureType =queryParams.structureType;
          this._getDrugs(this.result2,0);
          this._getTarget(this.result2,0);
        }
        else if  (queryParams.structureType === 'scaffold'){
        //   // this.result1 = queryParams.similarity;
          this.result2 = queryParams.smiles;
        //   this.structureType =queryParams.structureType;
           this._getDrugs2(this.result2,0);
           this._getTarget2(this.result2,0);
        }
  
      });
    }
     Tiaozhuan(sea?) {
      
      this.router.navigate(['/scaffoldt/'], {queryParams: {
        structureType: this.result1,
        smiles: this.result2,
        sea: sea
      }});
  }
  tiaozhuan(id){
    console.log(id)
    if(id.indexOf("N")!==-1){
          this.router.navigate(['/compound/',id])
      }
      else{
           this.router.navigate(['/Derivative/',id])
      }
   }
    private _getDrugs(sea?,page?) {
      
      this.restservice.getDataList2(`coresearchmol/?pk2='${sea}'`,page)
      .subscribe(data => {
        console.log(data)
        this.images=data['results']
        this.num = data['count']
        // console.log(this.num)
        this.isLoading = false; 
       
      });
  }
  private _getTarget(sea?,page?) {
    this.restservice.getDataList2(`coresearchtarget/?pk2='${sea}'`,page)
    .subscribe(data => {
      console.log(data)
      this.images2=data['results']
      this.num2 = data['count']
      // console.log(this.num)   
      this.isLoading2 = false; 
    });
}
  private _getDrugs2(sea?,page?) {      
    this.restservice.getDataList2(`coresearchmol/?pk1='${sea}'`,page)
    .subscribe(data => {
      console.log(1)
      console.log(data)
      this.images=data['results']
      this.num = data['count']
      // console.log(this.num)    
      this.isLoading = false; 
    });
  }
  private _getTarget2(sea?,page?) {
    this.restservice.getDataList2(`coresearchtarget/?pk1='${sea}'`,page)
    .subscribe(data => {
      console.log(1)
      console.log(data)
      this.images2=data['results']
      this.num2= data['count']
      // console.log(this.num)
      this.isLoading2 = false; 
     
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
  pageChange2(event) {
    this.isLoading2 = true; 
    if(this.result1=== 'framwork'){
      this._getTarget(this.result2,event.pageIndex);
    }
    if(this.result1=== 'scaffold'){
      this._getTarget2(this.result2,event.pageIndex);
    }
    
  }
  
  }
