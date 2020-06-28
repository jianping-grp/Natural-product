import { Component, OnInit,AfterViewInit, ViewChild,ElementRef ,Input,} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PageMeta} from '../../../models/page-meta';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-table-compound',
  templateUrl: './table-compound.component.html',
  styleUrls: ['./table-compound.component.css']
})
export class TableCompoundComponent implements OnInit {
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
  toppingList: string[] = ['canonical_smiles', 'Database Id','Slogp','Mol Weight','HBA','HBD','Numrotatablebonds'];
  displayedColumns: string[] = ['canonical_smiles', 'Database Id','Slogp','Mol Weight','HBA','HBD','Numrotatablebonds'];
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
    this.restservice.getDataList(`NPChemInfoSearch/${this.result1}`, page, perPage)
    .subscribe(data => {
      this.images = data['results'];
      this.count = data['count'];
      console.log(this.images);
      console.log(this.pageMeta);
    });
}
  pageChange(event) {
    this._getDrugs(event.pageIndex, event.pageSize);
  }
  cellClicked(params){
    this.myRouter.navigateByUrl(`compound/${params.data.database_id}`)
    console.log(params)
  }
  onBtExport() {
    this.params = {
      fileName: this.fileName1,
      sheetName: this.sheetName1
    };
    this.gridApi.exportDataAsCsv(this.params);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
