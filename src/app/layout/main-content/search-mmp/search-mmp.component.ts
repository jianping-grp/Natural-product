import { Component, OnInit , ViewChild,ElementRef ,Input} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap,Router} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-search-mmp',
  templateUrl: './search-mmp.component.html',
  styleUrls: ['./search-mmp.component.css']
})
export class SearchMmpComponent implements OnInit {
  result1;
  count;
  // 分页
  images = [];
  pageMeta:PageMeta | null;
  constructor(
    private restservice: RestService ,
    private http:HttpClient,
    private router:Router,
    private myrouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');
      this._getDrugsb(1);
    });
  }
  displayedColumnsb: string[] = ['Database Id1','Database Id2','Structure', 'MMP','Assay Id','Doc Id','PSA','ALOGP','MW'];
  // displayedColumnsc: string[] = ['Derivative Id','Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP',];
  allColumns:string[] = ['Database Id1','Database Id2','Structure', 'MMP','Assay Id','Doc Id','activity_type', 'activity_value', 'MW','PSA','ALOGP','HBD','HBA','ROTB','AROM','ALERTS','qed'];
  获取当前衍生物的相关化合物
  private _getDrugsb(page?, perPage?) {
    this.restservice.getDataList(`MMPSearch/?smile=${this.result1}`, page, perPage)
    .subscribe(data => {
        this.images=data['results'],
        this.count=data['count'],
        console.log(this.images)
    });
  }
  pageChange(event) {
    this._getDrugsb(event.pageIndex, event.pageSize);
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
