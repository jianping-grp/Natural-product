import { Component, OnInit,AfterViewInit, ViewChild,ElementRef ,Input,} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PageMeta} from '../../../models/page-meta';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  isLoading = true;
params;
count;
private gridApi;
private gridColumnApi;
paginationPageSize=10;
fileName1;
sheetName1;
@ViewChild('agGrid') agGrid: AgGridAngular;
columnDefs = [
  {headerName: 'Database Id', field: 'np_id', sortable: true, filter: true, width:238, },
  {headerName: 'Synonyms', field: 'synonyms', sortable: true, filter: true, width:238} ,
  {headerName: 'Slogp', field: 'ALOGP', sortable: true, filter: true, width:238, },
  {headerName: 'Mol Weight', field: 'MW', sortable: true, filter: true, width:238 },
   {headerName: 'HBA', field: 'HBA', sortable: true, filter: true, width:238, },
  {headerName: 'HBD', field: 'HBD', sortable: true, filter: true, width:238 } ,
  {headerName: 'Numrotatablebonds', field: 'ROTB', sortable: true, filter: true, width:238 } 
];
toppings = new FormControl();
toppingList: string[] = ['Smiles', 'Database ID','AlogP','Mol Weight','HBA','HBD','Numrotatablebonds'];
displayedColumns: string[] = ['Smiles', 'Database ID','AlogP','Mol Weight','HBA','HBD','Numrotatablebonds'];
allColumns:string[] = ['Database ID','Smiles', 'Synonyms', 'AlogP','Mol Weight','HBA','HBD','Numrotatablebonds','PSA','AROM','ALERTS','qed','sascore','npscore','freesasa','max_phase'];
    images:any;
    result1: string;
    // 分页
    pageMeta: PageMeta | null;
    @ViewChild('content') content: ElementRef;
    @Input() result1$: Observable<string>;
    @ViewChild(MatSort) sort: MatSort;
    @Input() pageSizeOptions = [10,20,50,100];
    @Input() pageSize = 10;
constructor(
    private restservice: RestService ,
    private myrouter: ActivatedRoute,
    private myRouter: Router,
    ) { }
ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
    console.log(params);
    this.result1 = params.get('id');
    this._getDrugs(0, this.pageSize); 
  });
}
// 小搜索框的搜索方法
private _getDrugs(page?, perPage?) {
  this.restservice.getDataList(`MolChemInfoSearch/${this.result1}`, page, perPage)
  .subscribe(data => {
    this.images = data['results'];
    this.count = data['count'];
    console.log(this.images);
    console.log(this.pageMeta);
    this.isLoading = false;
  });
}
pageChange(event) {
  this.isLoading = true;
  this._getDrugs(event.pageIndex, event.pageSize);
}
  //跳转到化合物和衍生物详情
  tiaozhuan(id){
    console.log(id)
    if(id.indexOf("N")!==-1){
          this.myRouter.navigate(['/compound/',id])
      }
      else{
           this.myRouter.navigate(['/Derivative/',id])
      }
   }
// cellClicked(params){
//   this.myRouter.navigateByUrl(`compound/${params.data.database_id}`)
//   console.log(params)
// }
// onBtExport() {
//   this.params = {
//     fileName: this.fileName1,
//     sheetName: this.sheetName1
//   };
//   this.gridApi.exportDataAsCsv(this.params);
// }
// onGridReady(params) {
//   this.gridApi = params.api;
//   this.gridColumnApi = params.columnApi;
// }
}
