import { Component, OnInit , ViewChild , ElementRef , Input} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap,Router} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {Observable} from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AgGridAngular } from 'ag-grid-angular'
import {Number} from '../../../models/number';
import {MatDialog} from '@angular/material';
import {Node} from '../../../models/node';
import {Link} from '../../../models/link';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {CompoundCardComponent} from '../../../share/card/compound-card/compound-card.component';
import {DocCardComponent} from '../../../share/card/doc-card/doc-card.component'
@Component({
  selector: 'app-derivative',
  templateUrl: './derivative.component.html',
  styleUrls: ['./derivative.component.css']
})
export class DerivativeComponent implements OnInit {
  scaffold
  drugs
  counts
  isLoading = true;
  isLoading2 = true;
  isLoading3 = true;
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
  atr: string;
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
  // echart: any;
  node:Node[];
  link:Link[];
  networkDataSubscription: Subscription;
  showStructure = false;
  showLabel = false;
  showDynamicNetwork = false;
  series: any;
  private echart;
  public echartOptions:{};
  dl = 1;
  key;
  mwMin = 0;
  mwMax = 4000;
  alogpMin = -40;
  alogpMax = 29;
  hbaMin = 0;
  hbaMax = 106;
  hbdMin = 0;
  hbdMax = 54;
  rtbMin = 0;
  rtbMax = 86;
  psaMin = 0;
  psaMax = 1745;
  aromMin = 0;
  aromMax = 18;
  alertsMin = 0;
  alertsMax = 10;
  qedMin = 0;
  qedMax = 0.95;
  sasMin = 1;
  sasMax = 10;
  npMin = -4.13;
  npMax = 4.11;
  freeMin = 24;
  freeMax = 4120;
  phaseMin = 0;
  phaseMax = 4;
  displayFilterParams: boolean;
  // @Input() displayedColumns = [];
  displayedColumns: string[] = ['Pref Name', 'Target Id', 'Target Type','Organism'];
  displayedColumnsb: string[] = ['Database Id','Structure','Core Structure', 'MMP',  'activity_value','ALOGP'];
  // displayedColumnsc: string[] = ['Derivative Id','activity_type', 'activity_value', 'MW','PSA','ALOGP','HBD','HBA',];
  allColumns:string[] = ['Database Id','Structure','Core Structure', 'MMP','activity_value', 'MW','PSA','ALOGP','HBD','HBA','ROTB','AROM','ALERTS','qed','sascore','npscore','freesasa','max_phase'];
  @ViewChild('click') click:ElementRef;
  @Input() result1$: Observable<string>;
  @Input() pageSizeOptions = [5,10,20,50];
  @Input() pageSize = 5;
  constructor(private restservice: RestService ,
              private myrouter: ActivatedRoute,
              private myRouter: Router,
              public dialog: MatDialog) { }
    ngOnInit() {
      this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');
      this._getDrugs(0, this.pageSize);
      this._getDrugsa(0, this.pageSize);
      this._getDrugsb(0, this.pageSize);   
      this._getDrugss(0, 8);  
      this._getDrugsav();
      this.displayFilterParams=true;
      this.inintNetworkOptions();
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
    ngAfterViewInit() {
      this.updateNetworkData()
    }
    // 获取化合物的基本信息
    private _getDrugs(page?, perPage?) {
        this.restservice.getDataList(`DerChemInfo/?mol_id=${this.result1}`, page, perPage)
        .subscribe(data => {
          this.arr = data['mol_chem_info_alls'][0];

          console.log(this.arr);
        });
        this.restservice.getDataList(`MolIdOtherdb/?mol_id=${this.result1}`, page, perPage)
        .subscribe(data => {
          this.arr1 = data['mol_id_otherdbs'][0];
          this.arr2= data['mol_id_otherdbs'][1];
          this.source=data['mol_id_otherdbs'][0]['db_source'].toUpperCase()
          this.source2=data['mol_id_otherdbs'][1]['db_source'].toUpperCase()
          // this.arr3= data['der_id_otherdbs'][2];
          console.log(this.arr1);
        });
// 获取当前衍生物的化合物
        // this.restservice.getDataList(`NPder/?mol_id=${this.result1}`, page, perPage)
        // .subscribe(data => {
        //             this.arr3 = data['n_pders'];
        //             for(var i=0;i<=data['meta']['total_pages']-1;i++){
                     
        //               this.restservice.getDataList(`NPder/?mol_id=${this.result1}`, page, perPage)
        //               .subscribe(data => {
        //                 for(var i=0;i<data['n_pders'].length;i++){
        //                   this.arr3.push(data['n_pders'][i])
        //                 }
                        
        //               })
        //               page = +(page) + 1;
                     
        //             }
        //             this.pageMeta3 = data['meta'];
        //             console.log('zaizheaaaaaaaa')
        //             console.log(this.arr3);                   
        // });
        this.restservice.getDataList(`DerAct/?mol_id=${this.result1}`, page, perPage)
        .subscribe(data => {
            // this.arr=data['np_acts'],
            this.pageMeta2=data['meta']
            console.log(this.arr)
            this.isLoading3 = false;
        });

    }
    获取当前化合物的靶点信息
    private _getDrugsa(page?, perPage?) {
      this.restservice.getDataList(`TargetInfoDer/?mol_id=${this.result1}`, page, perPage)
      .subscribe(data => {
        this.arra = data['target_info_news']
        console.log(this.arra);
        this.total_results=data['meta']['total_results']
        console.log(this.pageMeta4)
        this.pageMeta4.per_page=10
        // this.pageMeta4.total_pages
        console.log(this.arra);
        // this.isLoading2 = false;
    })}
    private _getDrugsav() {
}
获取当前衍生物的相关化合物MMP
private _getDrugsb(page?, perPage?) {
  this.restservice.getDataList(`MMPAll/?mol_id1=${this.result1}`, page, perPage)
  .subscribe(data => {
      this.images=data['mmp_all_news'],
      this.pageMeta=data['meta'],
      // this.size=this.images.length-1;
      // this.size=this.size+1
      // this.count=this.count*this.size
      console.log('这')
      console.log(this.images)
      this.isLoading = false;
  });
}
获取当前化合物的骨架相关分子
private _getDrugss(page?, perPage?) {
  this.restservice.getDataList(`molscaffold/?pk=${this.result1}`, page, perPage)
  .subscribe(data => {
      this.drugs=data['results'],
      this.counts=data['count']
      this.scaffold=data['results'][0]['scaffold_smiles']
      // this.pageMeta=data['meta'],
      // this.size=this.images.length-1;
      // this.size=this.size+1
      // this.count=this.count*this.size
      console.log(this.drugs)
      this.isLoading2 = false;
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
    openDocDialog(moleculeChemblId: number | string) {
      this.dialog.open(DocCardComponent, {
        width: '800px',
        data: {
          moleculeChemblId: moleculeChemblId
        }
      })
    }
    tiaozhuan(id){
      console.log(id)
      if(id.indexOf("N")!==-1){
            this.myRouter.navigate(['/compound/',id])
        }
        else{
             this.myRouter.navigate(['/Derivative/',id])
        }
     }
     tiaozhuan2(id1,id2){
      this.id=`?mol_id1=${id1}&mol_id2=${id2}`
      console.log(this.id)
      this.myRouter.navigate(['/searchmmp/',this.id])
     }
  pageChange(event) {
    this._getDrugsa( event.pageIndex, event.pageSize);
  }
  pageChanges(event) {
    this.isLoading = true;
    this._getDrugsb( event.pageIndex, event.pageSize);
  }
  pageChangess(event) {
    this.isLoading2 = true;
    this._getDrugss( event.pageIndex, event.pageSize);
  } 
  inintNetworkOptions() {
    this.series={
      type: 'graph',
      layout: 'circular',
      height: '600px',
      symbolSize: 100,
      cursor:'pointer',
      roam: true,
      tooltip: {
        show: true,
        formatter: (el) => {
          switch (el.dataType) {
            case 'node': {
              console.log(1)
              console.log(el)
              const nameId = el.data['name'].split('*')
              console.log(nameId)
              
                return `Database ID: ${nameId[0]}</br>` +
                  
                  `Molecule Weight: ${nameId[4]}</br> `+`AlogP:${nameId[5]}</br>`+`HBA:${nameId[6]}</br>`+`HBD:${nameId[7]}</br>`+`RTB:${nameId[9]}</br>`+`PSA:${nameId[8]}</br>`+`AROM:${nameId[10]}</br>`+`ALERTS:${nameId[11]}</br>`+`QED:${nameId[12]}</br>`+`Max Phase:${nameId[13]}</br>`+`Sascore:${nameId[1]}</br>`+`Npscore:${nameId[2]}</br>`+`Freesasa:${nameId[3]}</br>`;
              // } else if (el.data['category'] === 'Prescription') {
              //   return `${nameId[0]}</br>` +
              //     `chinese_name: ${nameId[1]}</br>` +
              //     `english_name: ${nameId[2]}`;
              // } else {
              //   return `${nameId[0]}</br>` +
              //     `english_name: ${nameId[1]}</br>`;
              // }
            }
          }
        }
      },
      label: {
        normal: {
   
          formatter:
            (el) => {
            // fetch name
            const nameId = el.data['name'].split('*');
            return nameId[0];
          },
          position: 'top',
        },
          show: this.showLabel,
          position: "bottom",
          color:'#79B9B1'
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [6, 6],
      edgeLabel: {
          fontSize: 5
      },
      itemStyle: {
        color: "#79B9B1"
      },
      focusNodeAdjacency: true,
    //   nodes:this.node
    // ,
    //   links:this.link
    // ,

      lineStyle: {
        color:'#BAC1C2',
          opacity: 0.9,
          width: 0.5,
          curveness: 0,
          type: 'solid'
      }
  }
    this.echartOptions={title: {
      text: ''
  },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [this.series]} 
  }

  onChartInit(ec) {
    this.echart = ec;
    this.echart.showLoading();
    this.getNetworkData(this.result1);
  }
  getNetworkData(sea) {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    this.restservice.getDataList4(`molgraph/?pk=${sea}&degree=${this.dl}`)
    .subscribe(data => {
        console.log(data)
        this.node=data["node"],
        this.link=data["links"]
        console.log(this.node)
        this.echart.setOption({

          series: [{
            nodes: this.node,
            links: this.link
          }]
        });
        this.echart.hideLoading();
      },
      () => {
        this.echart.hideLoading();
      });
    }
    getNetworkData2(sea) {
      if (this.echart !== undefined) {
        this.echart.showLoading();
      }
      this.restservice.getDataList4(`molgraphpng/?pk=${sea}&degree=${this.dl}`)
      .subscribe(data => {
          console.log(data)
          this.node=data["node"],
          this.link=data["links"]
          console.log(this.node)
          this.echart.setOption({
  
            series: [{
              nodes: this.node,
              links: this.link
            }]
          });
          this.echart.hideLoading();
        },
        () => {
          this.echart.hideLoading();
        });
      }
      showNodeLabel() {
        this.series.label.normal.show = this.showLabel;
        this.echart.setOption(this.echartOptions);
      }
      showStructureM(){
        if(this.showStructure==true){
          this.getNetworkData2(this.result1);
        }
        else{this.getNetworkData(this.result1);}
           
      }
    
      networkTransform() {
        if (this.showDynamicNetwork === true) {
          this.series.layout = 'force';
          this.series.force =  {
            repulsion: 350,
            gravity: 0.1,
            edgeLength: [50, 100]
          };
        } else {
          this.series.layout = 'circular';
        }
        this.echartOptions['series'] = [this.series];
        this.echart.setOption(this.echartOptions);
      }
      onDbClick(event){
        switch (event.dataType) {
          case 'node': {
            const nameId = event.data['name'].split('*');
            // return nameId[0];
            this.openDialog(nameId[0]);
            console.log(nameId[0])
            // const selectedTid = event.data.tid;
            // if (selectedTid === this.tid) {
            //   return;
            // } // escape current target
            // this.router.navigate(['targets', +(selectedTid)]);
            // break;
          }
          case 'edge': {
            console.log(event.data.source)
            const nameId1=event.data.source.split('*');
            const nameId2=event.data.target.split('*');
            console.log(nameId1)
            this.id=`?mol_id1=${nameId1[0]}&mol_id2=${nameId2[0]}`
            this.myRouter.navigate(['/searchmmp/',this.id])
            // let url = 'network-datatable/phin-activities';
            // if (this.networkDataType === 'target_scaffold_networks') {
            //   url = 'network-datatable/phin-scaffold-activities';
            // }
            // this.globalService.gotoPhinActivityList(PhinActivityListParamType.target_target, {
            //   first_target: event.data.source,
            //   second_target: event.data.target,
            //   top: event.data.value,
            // });
          }

  
      }}
      openDialog(moleculeChemblId: number | string){
        this.dialog.open(CompoundCardComponent, {
          width: '800px',
          data: {
            moleculeChemblId: moleculeChemblId
          }
        })
      }
      updateNetworkData(){
        this.key='MW:'+this.mwMin+'~'+this.mwMax+'+ALOGP:'+this.alogpMin+'~'+this.alogpMax+'+HBD:'+this.hbdMin+'~'+this.hbdMax+'+HBA:'+this.hbaMin+'~'+this.hbaMax+'+ROTB:'+this.rtbMin+'~'+this.rtbMax+'&ptype=ALOGP'
        this.atr=this.result1+'&range='+this.key
        console.log(this.atr)
        console.log(this.dl)
        if(this.showStructure==true){
          this.getNetworkData2(this.atr);
        }
        else{this.getNetworkData(this.atr);}
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

