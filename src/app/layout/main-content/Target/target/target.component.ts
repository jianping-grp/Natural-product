import { Component, OnInit , ViewChild,ElementRef ,Input} from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PageMeta} from '../../../../models/page-meta';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {
  result1: string;
  num:number;
  num1:number;
  // 分页
  images = [];
  images1 = [];
  pageMeta:PageMeta | null;
  displayedColumnsb: string[] = ['Derivative Id','Compound Id','Structure', 'MMP','Pubmed Id','Np Activity Value',];
  displayedColumnsc: string[] = ['Derivative Id','Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP',];
  allColumns:string[] = ['Derivative Id','Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP','HBD','HBA','ROTB','AROM','ALERTS','qed'];
  constructor(private restservice: RestService ,
              private myrouter: ActivatedRoute) { }
  ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');
      this._getDrugs();
      this.getBioactivites();
      this._getDrugsb(0,10);
    });
  }
  private _getDrugs() {
      this.restservice.getDataList(`TargetInfo/?tid=${this.result1}`)
      .subscribe(data => {
        this.images = data['target_info2s'];
        // this.compounds=data["meta"]["total_results"]
        console.log(this.images);
      });
    }
获取当前靶点的MMP
private _getDrugsb(page?, perPage?) {
  this.restservice.getDataList(`MMPTarget/?tid=${this.result1}`, page, perPage)
  .subscribe(data => {
      this.images1=data['mmp_targets'],
      this.pageMeta=data['meta'],

      console.log(this.images)
  });
}
pageChange(event) {
  this._getDrugsb(event.pageIndex, event.pageSize);
}
getBioactivites(){
  this.restservice.getDataList(`NPAct/?target_id=${this.result1}`).subscribe(data=>{
      this.num=data["meta"]["total_results"]
  })
  this.restservice.getDataList(`DerAct/?target_id=${this.result1}`).subscribe(data=>{
    this.num1=data["meta"]["total_results"]
})
}
}
