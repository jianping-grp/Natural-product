import { Component, OnInit,AfterViewInit, ViewChild,ElementRef ,Input,} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PageMeta} from '../../../models/page-meta';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-table-derivative',
  templateUrl: './table-derivative.component.html',
  styleUrls: ['./table-derivative.component.css']
})
export class TableDerivativeComponent implements OnInit {
  params;
  num:number;
  private gridApi;
  private gridColumnApi;
  paginationPageSize=10;
  fileName1;
  sheetName1;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    {headerName: 'Database Id', field: 'der_id', sortable: true, filter: true, width:238, },
    {headerName: 'Synonyms', field: 'synonyms', sortable: true, filter: true, width:238} ,
    {headerName: 'Slogp', field: 'slogp', sortable: true, filter: true, width:238, },
    {headerName: 'Mol Weight', field: 'amw', sortable: true, filter: true, width:238 },
     {headerName: 'HBA', field: 'numhba', sortable: true, filter: true, width:238, },
    {headerName: 'HBD', field: 'numhbd', sortable: true, filter: true, width:238 } ,
    {headerName: 'Numrotatablebonds', field: 'numrotatablebonds', sortable: true, filter: true, width:238 } 
  ];
      toppings = new FormControl();
      toppingList: string[] = ['canonical_smiles', 'Database Id','Synonyms', 'Slogp','Mol Weight','HBA','HBD','Numrotatablebonds'];
      displayedColumns: string[] = ['canonical_smiles', 'Database Id','Synonyms', 'Slogp','Mol Weight',];
      allColumns:string[] = ['canonical_smiles', 'Database Id','Synonyms', 'Slogp','Mol Weight','HBA','HBD','Numrotatablebonds','PSA','AROM','ALERTS','qed'];
      images:any;
      total_results:number;per_page:number;
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
      // this._getDrugs(0, this.pageSize); 
      this._getDrugs2(0, this.pageSize); 
    });
  }
  private _getDrugs2(page?, perPage?) {
    this.restservice.getDataList(`DerChemInfo/${this.result1}`, page, perPage)
    .subscribe(data => {
      this.images = data['der_chem_info2s'];
      console.log(data)
      this.pageMeta= data['meta'];
      // this.per_page=10
      // this.pageMeta.total_results= data['count'];
      console.log(data)
      console.log(this.images);
      console.log(this.pageMeta);
    });
  }
  pageChange(event) {
    this._getDrugs2(event.pageIndex, event.pageSize);
  }
  }
