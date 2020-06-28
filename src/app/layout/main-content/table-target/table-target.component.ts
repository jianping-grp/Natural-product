import { Component, OnInit,AfterViewInit, ViewChild,ElementRef ,Input,} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PageMeta} from '../../../models/page-meta';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-table-target',
  templateUrl: './table-target.component.html',
  styleUrls: ['./table-target.component.css']
})
export class TableTargetComponent implements OnInit {
  total_results:number;
  params;
  private gridApi;
  private gridColumnApi;
  paginationPageSize=10;
  paginationGetRowCount;
  paginationGetTotalPages;
  fileName1;
  sheetName1;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [
    // checkboxSelection: true , 
    {headerName: 'Pref Name', field: 'name', sortable: true, filter: true, width:260  },
    {headerName: 'Target Id', field: 'tid', sortable: true, filter: true, width:260 ,  },
    {headerName: 'Target Type ', field: 'type', sortable: true, filter: true, width:260  },
    {headerName: 'Target Class ', field: 'target_class', sortable: true, filter: true, width:260  },
    {headerName: 'Organism', field: 'organism', sortable: true, filter: true, width:260  }
    
  ];
    toppings = new FormControl();
    toppingList: string[] = ['Pref Name', 'Target Id', 'Target Type','Organism'];
    displayedColumns: string[] = ['Pref Name', 'Target Id', 'Target Type','Organism'];
    images = [];
    result1: string;
    scontent: string;
    // 分页
    pageMeta: PageMeta | null;
    @ViewChild('content') content: ElementRef;
    @ViewChild(MatSort) sort: MatSort;
    @Input() result1$: Observable<string>;
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
private _getDrugs(page?, perPage?) {
    this.restservice.getDataList(`TargetInfo/${this.result1}&ordering=target_id`, page, perPage)
    .subscribe(data => {
      this.images = data['target_info2s'];
      this.total_results = data['meta']['total_results'];
      console.log(this.images);
    });
}
pageChange(event) {
  this._getDrugs(event.pageIndex, event.pageSize);
}

}
