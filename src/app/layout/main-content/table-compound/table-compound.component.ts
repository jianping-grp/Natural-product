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
  isLoading = true;
  params;
  num:number;
  private gridApi;
  private gridColumnApi;
  paginationPageSize=10;
  fileName1;
  sheetName1;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  // columnDefs = [
  //   {headerName: 'Database Id', field: 'np_id', sortable: true, filter: true, width:328, },
  //   {headerName: 'Synonyms', field: 'synonyms', sortable: true, filter: true, width:218} ,
  //   {headerName: 'Slogp', field: 'slogp', sortable: true, filter: true, width:218, },
  //   {headerName: 'Mol Weight', field: 'amw', sortable: true, filter: true, width:218 },
  //    {headerName: 'HBA', field: 'numhba', sortable: true, filter: true, width:218, },
  //   {headerName: 'HBD', field: 'numhbd', sortable: true, filter: true, width:218 } ,
  //   {headerName: 'canonical_smiles', field: 'canonical_smiles', sortable: true, filter: true, width:238 } 
  // ];
      toppings = new FormControl();
      toppingList: string[] = [ 'mol_id','Smiles','Synonyms', 'AlogP','Mol Weight','HBA','HBD',];
      displayedColumns: string[] = ['mol_id','Smiles', 'Synonyms', 'AlogP','Mol Weight','HBA','HBD',];
      allColumns:string[] = ['mol_id','Smiles', 'Synonyms', 'AlogP','Mol Weight','HBA','HBD','Numrotatablebonds','PSA','AROM','ALERTS','qed','sascore','npscore','freesasa','max_phase'];
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
      console.log(this.sort)
  
    });

  }
  // 小搜索框的搜索方法
  // hqnew() {
  //       this.result1 = this.content.nativeElement.value;
  //       this._getDrugs2(0, this.pageSize);
  // }
  // private _getDrugs(page?, perPage?) {
  //     this.restservice.getDataList(`YNpDbLocal/?search=${this.result1}`, page, perPage)
  //     .subscribe(data => {
  //       this.images = data['np_db_locals'];
  //       this.pageMeta = data['meta'];
  //       console.log(this.images);
  //       console.log(this.pageMeta);
  //     });
  // }
  // ngAfterViewInit() {
  //   const page=0,perPage=10
  //   this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
  //   console.log(this.sort.direction)
  //   this.restservice.getDataList(`NPChemInfo/${this.result1}`, page, perPage)
  //   .subscribe(data => {
      
  //     this.images = data['mol_chem_info_alls'];
  //     console.log(data)
  //     this.pageMeta= data['meta'];
  //     // this.per_page=10
  //     // this.pageMeta.total_results= data['count'];
  //     console.log(data)
  //     console.log(this.images);
  //     console.log(this.pageMeta);
  //     this.isLoading = false;
  //     console.log(this.sort.active)
  //   });

  // }
  private _getDrugs2(page?, perPage?) {
    this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
    console.log(this.sort.direction)
    this.restservice.getDataListby(`NPChemInfo/${this.result1}`, page, perPage,this.sort.direction)
    .subscribe(data => {
      
      this.images = data['mol_chem_info_alls'];
      console.log(data)
      this.pageMeta= data['meta'];
      // this.per_page=10
      // this.pageMeta.total_results= data['count'];
      console.log(data)
      console.log(this.images);
      console.log(this.pageMeta);
      this.isLoading = false;
      console.log(this.sort.active)
    });
  }
  pageChange(event) {
    this.isLoading = true;
    this._getDrugs2(event.pageIndex, event.pageSize);
  }
  
  }
 