import { Component, OnInit,Input } from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap,Router} from '@angular/router';
@Component({
  selector: 'app-mmp-single',
  templateUrl: './mmp-single.component.html',
  styleUrls: ['./mmp-single.component.css']
})
export class MmpSingleComponent implements OnInit {
  isLoading=true
  id
drugs
counts
scaffold
result1
@Input() pageSizeOptions = [ 5,10,20,50];
@Input() pageSize = 12;
  constructor(private restservice: RestService ,
    private myrouter: ActivatedRoute,
              private myRouter: Router,) { }

  ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');
      this._getDrugss(0, this.pageSize);
    })

  }
  获取当前化合物的骨架相关分子
  private _getDrugss(page?, perPage?) {
    this.restservice.getDataList(`MMPSearch/${this.result1}`, page, perPage)
    .subscribe(data => {
        this.drugs=data['results'],
        this.counts=data['count']
        console.log(this.drugs)
        this.isLoading = false;
    });
    // this.isLoading=false
  }
  pageChangess(event) {
    this.isLoading = true;
    console.log(event.pageIndex)
    this._getDrugss( event.pageIndex, event.pageSize);
  } 
  // tiaozhuan(id){
  //   console.log(id)
  //   if(id.indexOf("N")!==-1){
  //         this.myRouter.navigate(['/compound/',id])
  //     }
  //     else{
  //          this.myRouter.navigate(['/Derivative/',id])
  //     }
  //  }
   tiaozhuan(sea){
    // this.id=`?mol_id1=${id1}&mol_id2=${id2}`
    // console.log(this.id)
    this.id=`?pk2="${sea}"`
    this.myRouter.navigate(['/mmpd/',this.id])
   }
}
