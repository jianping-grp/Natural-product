import { Component, OnInit , ViewChild,ElementRef ,Input} from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap,Router} from '@angular/router';
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
  str='';
  str2='';
  shuzu=[];
  shuzu2=[];
  @Input() pageSizeOptions = [ 10,20,50,100];
  @Input() pageSize = 10;
  displayedColumnsb: string[] = ['Database Id1','Database Id2','compound1 Structure','compound2 Structure','Structure', 'MMP','Assay Id','activity_type', 'activity_value','ALOGP',];
  // displayedColumnsc: string[] = ['Derivative Id','Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP',];
  allColumns:string[] = ['Database Id1','Database Id2','compound1 Structure','compound2 Structure','Structure', 'MMP','Assay Id','Doc Id','activity_type', 'activity_value', 'MW','PSA','ALOGP','HBD','HBA','ROTB','AROM','ALERTS','qed'];
  constructor(private restservice: RestService ,
    private router:Router,
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
        if(data['target_info2s'][0]['uniprot_id']){
          this.str=data['target_info2s'][0]['uniprot_id']
          this.shuzu=this.str.split(', ')
          console.log(this.shuzu)
        }
        if(data['target_info2s'][0]['mol_id']){
          this.str2=data['target_info2s'][0]['mol_id']
          this.shuzu2=this.str2.split(', ')
          console.log(this.shuzu2)
        }

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
  //跳转到化合物和衍生物详情
  tiaozhuan(id){
    console.log(id)
    if(id.indexOf("N")!==-1){
          this.router.navigate(['/compound/',id])
      }
      else{
           this.router.navigate(['/Derivative/',id])
      }
   }
}
