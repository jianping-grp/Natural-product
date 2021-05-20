import { Component, OnInit,AfterViewInit, ViewChild,ElementRef ,Input,} from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {NewmolCardComponent} from '../../../../share/card/newmol-card/newmol-card.component';
@Component({
  selector: 'app-newmol-detail',
  templateUrl: './newmol-detail.component.html',
  styleUrls: ['./newmol-detail.component.css']
})
export class NewmolDetailComponent implements OnInit {
  isLoading = true;
  images=[]
  arr=[];
  count
  result1
  core
  sub;
  @Input() pageSizeOptions = [10,20,50,100];
  @Input() pageSize = 10;
  columnDefs = [
    {headerName: 'substructure', field: 'substructure', sortable: true, filter: true, width:238, },
    {headerName: 'new_mol', field: 'new_mol', sortable: true, filter: true, width:238} ,
    {headerName: 'detail', field: 'detail', sortable: true, filter: true, width:238, },
    // {headerName: 'Mol Weight', field: 'amw', sortable: true, filter: true, width:238 },
    //  {headerName: 'HBA', field: 'numhba', sortable: true, filter: true, width:238, },
    // {headerName: 'HBD', field: 'numhbd', sortable: true, filter: true, width:238 } ,
    // {headerName: 'Numrotatablebonds', field: 'numrotatablebonds', sortable: true, filter: true, width:238 } 
  ];
      // toppings = new FormControl();
      toppingList: string[] = ['substructure', 'new_mol','detail'];
      displayedColumns: string[] = ['substructure', 'new_mol','detail'];
      // allColumns:string[] = ['substructure','new_mol', ];
  constructor(
    public dialog: MatDialog,
    private restservice: RestService ,
    private myrouter: ActivatedRoute,
    private myRouter: Router,
  ) { }

  ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');
      // this._getDrugs(0, this.pageSize); 
      // this.num=this.result1.indexOF('&');
      this.arr=this.result1.split('&')
      this.core=this.arr[0]
      this.sub=this.arr[1]
      console.log(this.core)
      console.log(this.sub)
      this._getDrugs2(0); 
    });
  }
  private _getDrugs2(page?) {
    // this.restservice.getDataList2(`MolFragExchange/?core="${this.arr[0]}"&sub="${this.arr[1]}"`, page)
    // this.restservice.getDataList2(`MolFragExchange/?core="CC[C@]12CN3C[C@](C(C)C)(CN(C1)C3[*:1])C2=O"&sub="Brc1cccc([*:1])c1"`, page)
    this.restservice.getDataList2(`MolFragExchange/?core="${this.core}"&sub="${this.sub}"`, page)        
    .subscribe(data => {
      this.images = data['results'];
      console.log(data)
      this.count= data['count'];
      // this.per_page=10
      // this.pageMeta.total_results= data['count'];
      console.log(data)
      console.log(this.images);
      this.isLoading = false;
    });
  }
  pageChange(event) {
    this.isLoading = true;
    this._getDrugs2(event.pageIndex);
  }
  openMoleculePropertiesDialog(moleculeId: number | string) {
    this.dialog.open(NewmolCardComponent, {
      width: '800px',
      data: {
        moleculeChemblId: moleculeId
      }
    })
  }
}
