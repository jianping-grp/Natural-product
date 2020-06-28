import { Component, OnInit , ViewChild , ElementRef , Input} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap,Router} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {Observable} from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgGridAngular } from 'ag-grid-angular'
import {Number} from '../../../models/number';
@Component({
  selector: 'app-derivative',
  templateUrl: './derivative.component.html',
  styleUrls: ['./derivative.component.css']
})
export class DerivativeComponent implements OnInit {
  total_results:number;
  // 用来展示图表接口参数
  datav:Number[]
  dataname=[];
  para:string;
  datav1:Number[]
  dataname1=[];
  para1:string;
  count;
  size;
  //  可导出表格参数
  // params;
  // private gridApi;
  // private gridColumnApi;
  // paginationPageSize=10;
  // paginationGetRowCount;
  // paginationGetTotalPages;
  // fileName1;
  // sheetName1;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  
  columnDefs = [
    {headerName: 'Target Id', field: 'tid', sortable: true, filter: true, checkboxSelection: true , width:240  },
    {headerName: 'Name', field: 'name', sortable: true, filter: true, width:240, },
    {headerName: 'Uniprot Id', field: 'uniprot_id', sortable: true, filter: true, width:240 }, 
    // {headerName: 'gene', field: 'gene', sortable: true, filter: true, width:300 }, 
    // {headerName: 'target_class', field: 'target_class', sortable: true, filter: true, width:300 }, 
    {headerName: 'Target Type', field: 'type', sortable: true, filter: true, width:240 },
    {headerName: 'Organism', field: 'organism', sortable: true, filter: true, width:240 } 
  ];
  result1: string;
  // 分页
  pageMeta:  PageMeta | null;
  pageMeta2: PageMeta | null;
  pageMeta3: PageMeta | null;
  pageMeta4: PageMeta | null;
  pageMeta5: PageMeta | null;
  pageMetaa: PageMeta | null;
  // 接受数据的对象及数组
  imagesa = '';
  images = [];
  array = new MatTableDataSource();
  arra = [];
  arr ;
  arr1 ;
  arr2 ;
  // arr3;
  arr3 = []
  source;
  source2;
  id: string;
  public obj:{};
  public obj2:{};
  public obj3:{};
  echart: any;
  // @Input() displayedColumns = [];
  displayedColumns: string[] = ['Pref Name', 'Target Id', 'Target Type','Target Class','Organism'];
  
  displayedColumnsb: string[] = ['Compound Id','Structure', 'MMP','tid', 'Pubmed Id','Np Activity Value',];
  displayedColumnsc: string[] = ['Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP','HBD','HBA',];
  allColumns:string[] = ['Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP','HBD','HBA','ROTB','AROM','ALERTS','qed'];
  @ViewChild('click') click:ElementRef;
  @Input() result1$: Observable<string>;
  @Input() pageSizeOptions = [10,20,50,100];
  @Input() pageSize = 10;
  constructor(private restservice: RestService ,
              private myrouter: ActivatedRoute,
              private myRouter: Router,) { }
    ngOnInit() {
      this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');
      this._getDrugs(0, this.pageSize);
      this._getDrugsa(0, this.pageSize);
      this._getDrugsb(0, this.pageSize);
      
      this._getDrugsav()
      this.restservice.getData(`TargetInfoSearch/?pk=${this.result1}`)
      .subscribe(data => {
        // this.datav[0]['value'] = data['organism'][0][1]
        // this.datav[1]['value'] = data['organism'][1][1]
        this.datav=data['organism']
        console.log(1)
        console.log(data);
        console.log(this.datav);

        for (let i = 0; i < data['organism'].length; i++) {
              this.para=data['organism'][i]['name']
          this.dataname.push(this.para)
        }
        this.datav1=data['target_type']
        console.log(1)
        console.log(data);
        console.log(this.datav1);

        for (let i = 0; i < data['target_type'].length; i++) {
              this.para1=data['target_type'][i]['name']
          this.dataname1.push(this.para1)
        }
        this.obj3 = {
          title : {
              text: 'Organism',
              // subtext: '纯属虚构',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: this.dataname
          },
          series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:this.datav,
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
        this.obj2 = {
          title : {
              text: 'Target Type',
              // subtext: '纯属虚构',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data:this.dataname1
          },
          series : [
              {
                  name: 'Target Type',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:this.datav1,
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
    })
    //
      this.obj = {
        title: {text: `Similarity Distribution`,
        textAlign:'auto'
      },
         color: ['#3398DB','#c23531'],
         tooltip : {
             trigger: 'axis',
             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
             }},
         grid: {
             left: '3%',
             right: '4%',
             bottom: '3%',
             containLabel: true
         },
         xAxis : [
             {   type : 'category',
                 data :['0-0.2', '0.2-0.4','0.4-0.6','0.6-0.8','0.8-1.0'],
                 axisTick: {
                     alignWithLabel: true
                 },
                 name:''
             }
         ],
         yAxis : [
             { name:`Natrue Prouduct s`,
               type : 'value'}],
         series : [
             {
                 name: '',
                 type: 'bar',
                 barWidth: '40%',
                 data: ['1100','456','321','234','10','2']
             }
         ]
      }
    })}
    // 获取化合物的基本信息
    private _getDrugs(page?, perPage?) {
        this.restservice.getDataList(`DerChemInfo/?der_id=${this.result1}`, page, perPage)
        .subscribe(data => {
          this.arr = data['der_chem_info2s'][0];

          console.log(this.arr);
        });
        // this.restservice.getDataList(`DerIdOtherdb/?der_id=${this.result1}`, page, perPage)
        // .subscribe(data => {
        //   this.arr1 = data['der_id_otherdbs'][0];
        //   this.arr2= data['der_id_otherdbs'][1];
        //   this.source=data['der_id_otherdbs'][0]['db_source'].toUpperCase()
        //   this.source2=data['der_id_otherdbs'][1]['db_source'].toUpperCase()
        //   // this.arr3= data['der_id_otherdbs'][2];
        //   console.log(this.arr1);
        // });
// 获取当前衍生物的化合物
        this.restservice.getDataList(`NPder/?der_id=${this.result1}`, page, perPage)
        .subscribe(data => {
          this.arr3 = data['n_pders'];
          this.pageMeta3 = data['meta'];
          console.log(this.arr3);
        });
        this.restservice.getDataList(`DerAct/?der_id=${this.result1}`, page, perPage)
        .subscribe(data => {
            // this.arr=data['np_acts'],
            this.pageMeta2=data['meta']
            console.log(this.arr)
        });

    }
    获取当前化合物的靶点信息
    private _getDrugsa(page?, perPage?) {
      this.restservice.getDataList(`TargetInfoDer/?der_id=${this.result1}`, page, perPage)
      .subscribe(data => {
        this.arra = data['target_info_der2s']
        console.log(this.arra);
        this.total_results=data['meta']['total_results']
        console.log(this.pageMeta4)
        this.pageMeta4.per_page=10
        // this.pageMeta4.total_pages
        console.log(this.arra);
    })}
    private _getDrugsav() {
}
获取当前衍生物的相关化合物MMP
private _getDrugsb(page?, perPage?) {
  this.restservice.getDataList(`MMPDN/?mol_id1=${this.result1}`, page, perPage)
  .subscribe(data => {
      this.images=data['mmpdns'],
      this.pageMeta=data['meta'],
      // this.size=this.images.length-1;
      // this.size=this.size+1
      // this.count=this.count*this.size
      console.log('这')
      console.log(this.images)
  });
}
// private _getDrugsa(page?, perPage?) {
//   this.restservice.getDataList(`NPDtargetinfo/?target_id=${this.result1}`, page, perPage)
//   .subscribe(data => {
//     for(var i=0;i<=data['n_passays'].length-1;i++){
//     this.imagesa = data['n_passays'][i]['target_id'];
//     this.restservice.getDataList(`NPDtargetinfo/?target_id=${this.imagesa}`)
//     .subscribe(data => {
//       this.images = data['np_dtargetinfos'][0];
//       this.arra.push(this.images)
//     })
//   }
//   this.array.data=this.arra;
//   console.log(this.arra);
// })}
// 获取当前化合物的衍生物的活性数据
  // onclick(id?,page?,pageSize?){
  //     this.id=id
  //     this.restservice.getDataList(`NPderivativeassay/?derivative_id=${id}`,page,pageSize)
  //     .subscribe(data => {
  //     console.log(data);
  //     this.arr4 = data['n_pderivativeassays'];
  //     this.pageMeta4 = data['meta'];
  //     console.log(this.arr4);
  //     });
  // }
    // pageChangeb(event) {
    //   this.onclick(this.id, event.pageIndex, event.pageSize);
    // }

  pageChange(event) {
    this._getDrugsa( event.pageIndex, event.pageSize);
  }
  pageChanges(event) {
    this._getDrugsb( event.pageIndex, event.pageSize);
  }
  // 点击跳转靶点详情页面
  // cellClicked(params){
  //   this.myRouter.navigateByUrl(`target/${params.data.tid}`)
  //   console.log(params)
  // }
  // sortchanged(params){
  //   // console.log(params)
  // }
  // //  导出CSV
  // onBtExport() {
  //   this.params = {
  //     fileName: this.fileName1,
  //     sheetName: this.sheetName1
  //   };
  //   this.gridApi.exportDataAsCsv(this.params);
  // }
  //   //  生成可导出表格
  // onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  // }
}

