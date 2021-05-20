import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , ParamMap, Router} from '@angular/router';
import {RestService} from '../../../../service/rest/rest.service';
@Component({
  selector: 'app-scaffold-detail',
  templateUrl: './scaffold-detail.component.html',
  styleUrls: ['./scaffold-detail.component.css']
})
export class ScaffoldDetailComponent implements OnInit {
  result2:string;
  num:number;
  result1:any;
  images=[];
  displayedColumns: string[] = ['core','Structure','detail'];
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
        }
        else if  (queryParams.structureType === 'scaffold'){
        //   // this.result1 = queryParams.similarity;
          this.result2 = queryParams.smiles;
        //   this.structureType =queryParams.structureType;
           this._getDrugs2(this.result2,0);
        }
  
      });
    }
     Tiaozhuan(sea?) {
      
      this.router.navigate(['/scaffoldt/'], {queryParams: {
        structureType: this.result1,
        smiles: this.result2,
        target: sea
      }});
  }
    private _getDrugs(sea?,page?) {
      
      this.restservice.getDataList2(`coresearchtarget/?pk2='${sea}'`,page)
      .subscribe(data => {
        console.log(data)
        this.images=data['results']
        this.num = data['count']
        // console.log(this.num)
       
      });
  }
  private _getDrugs2(sea?,page?) {
      
    this.restservice.getDataList2(`coresearchtarget/?pk1='${sea}'`,page)
    .subscribe(data => {
      console.log(1)
      console.log(data)
      this.images=data['results']
      this.num = data['count']
      // console.log(this.num)
     
    });
  }
  pageChange(event) {
    // this.isLoading = true;
    if(this.result1=== 'framwork'){
      this._getDrugs(this.result2,event.pageIndex);
    }
    if(this.result1=== 'scaffold'){
      this._getDrugs2(this.result2,event.pageIndex);
    }
    
  }
  }

