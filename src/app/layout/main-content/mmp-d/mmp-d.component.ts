import { Component, OnInit , ViewChild,ElementRef ,Input} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap,Router} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {DocCardComponent} from '../../../share/card/doc-card/doc-card.component'
@Component({
  selector: 'app-mmp-d',
  templateUrl: './mmp-d.component.html',
  styleUrls: ['./mmp-d.component.css']
})
export class MmpDComponent implements OnInit {
  isLoading = true;
  result1;
  count;
  id;
  // 分页
  images = [];
  pageMeta:PageMeta | null;
  constructor(
    private restservice: RestService ,
    private http:HttpClient,
    private router:Router,
    private myrouter: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');
      console.log(this.result1);
      this._getDrugsb(0);
    });
  }
  displayedColumnsb: string[] = ['Database Id1','Database Id2','compound1 Structure','compound2 Structure','Structure', 'MMP','activity_value','ALOGP',];
  // displayedColumnsc: string[] = ['Derivative Id','Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP',];
  allColumns:string[] = ['Database Id1','Database Id2','compound1 Structure','compound2 Structure','Structure', 'MMP', 'MW','PSA','activity_value','ALOGP','HBD','HBA','ROTB','AROM','ALERTS','qed','sascore','npscore','freesasa','max_phase'];
  获取当前衍生物的相关化合物
  private _getDrugsb(page?, perPage?) {
    this.restservice.getDataList(`MMPSearch/${this.result1}`, page, perPage)
    .subscribe(data => {
        this.images=data['results'],
        this.count=data['count'],
        console.log(this.images)
        this.isLoading = false;
    });
  }
  pageChange(event) {
    this.isLoading = true;
    this._getDrugsb(event.pageIndex, event.pageSize);
  }
  // openDocDialog(moleculeChemblId: number | string) {
  //   this.dialog.open(DocCardComponent, {
  //     width: '800px',
  //     data: {
  //       moleculeChemblId: moleculeChemblId
  //     }
  //   })
  // }
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
  tiaozhuan2(id1,id2){
    this.id=`?mol_id1=${id1}&mol_id2=${id2}`
    console.log(this.id)
    this.router.navigate(['/searchmmp/',this.id])
   }
}
