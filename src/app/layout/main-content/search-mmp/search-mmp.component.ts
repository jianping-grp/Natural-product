import { Component, OnInit , ViewChild,ElementRef ,Input} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
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
    private myrouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');
      this._getDrugsb(1);
    });
  }
  displayedColumnsb: string[] = ['Derivative Id','Compound Id','Structure', 'MMP','Pubmed Id','Np Activity Value',];
  displayedColumnsc: string[] = ['Derivative Id','Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP',];
  allColumns:string[] = ['Derivative Id','Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP','HBD','HBA','ROTB','AROM','ALERTS','qed'];
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
}
