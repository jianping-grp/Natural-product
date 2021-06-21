import { Component, OnInit , ViewChild,ElementRef ,Input} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap,Router,} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {Observable} from 'rxjs';
import {Node} from '../../../models/node';
import {Link} from '../../../models/link';
import {Subscription} from 'rxjs/Subscription';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {CompoundCardComponent} from '../../../share/card/compound-card/compound-card.component';
import {DocCardComponent} from '../../../share/card/doc-card/doc-card.component'
import {environment} from '../../../../environments/environment';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-assay',
  templateUrl: './assay.component.html',
  styleUrls: ['./assay.component.css']
})
export class AssayComponent implements OnInit {
  private restHost = environment.REST_HOST;
  count
  selected = 'MW'
  foods= [
    {value: 'MW', viewValue: 'MW'},
    {value: 'ALOGP', viewValue: 'ALOGP'},
    {value: 'HBD', viewValue: 'HBD'},
    {value: 'HBA', viewValue: 'HBA'},
    {value: 'ROTB', viewValue: 'ROTB'},
    {value: 'PSA', viewValue: 'PSA'},
    {value: 'AROM', viewValue: 'AROM'},
    {value: 'ALERTS', viewValue: 'ALERTS'},
    {value: 'qed', viewValue: 'qed'},
    {value: 'sascore', viewValue: 'sascore'},
    {value: 'npscore', viewValue: 'npscore'},
    {value: 'freesasa', viewValue: 'freesasa'},
    {value: 'max_phase', viewValue: 'max_phase'},
  ];
  id
  isLoading = true;
  isLoading2 = true;

  result1: string;
  atr: string;
  num:number;
  num1:number;
  // 分页
  images = [];
  images1 = [];
  pageMeta:PageMeta | null;
  str='';
  str2='';
  shuzu=[];
  shuzu2=[];
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
  psaMax = 4000;
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
  @Input() pageSizeOptions = [5,10,20,50];
  @Input() pageSize = 5;
  displayFilterParams: boolean;
  displayedColumnsb: string[] = ['Database Id1','Database Id2','compound1 Structure','compound2 Structure','Structure', 'MMP','Assay Id','activity_type', 'activity_value','activity_comment','ALOGP',];
  // displayedColumnsc: string[] = ['Derivative Id','Compound Id','activity_type', 'activity_value', 'MW','PSA','ALOGP',];
  allColumns:string[] = ['Database Id1','Database Id2','compound1 Structure','compound2 Structure','Structure', 'MMP','Assay Id','Doc Id','activity_type', 'activity_value', 'activity_comment','MW','PSA','ALOGP','HBD','HBA','ROTB','AROM','ALERTS','qed','sascore','npscore','freesasa','max_phase'];
  constructor(private restservice: RestService ,
    private router:Router,
    private http: HttpClient,
              private myrouter: ActivatedRoute,
              public dialog: MatDialog) { 
    
  }

  ngOnInit() {
    this.myrouter.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      this.result1 = params.get('id');
      this._getDrugs();
      this.getBioactivites();
      this._getDrugsb(0,5);
      this.displayFilterParams=true;
     });

     this.inintNetworkOptions();

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
                  `Act Value: ${nameId[14]}${nameId[15]}</br>` + `Activity Comment: ${nameId[16]}</br>`+
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
    this.getNetworkData();
  }
  getNetworkData() {
    if (this.echart !== undefined) {
      this.echart.showLoading();
    }
    this.restservice.getDataList4(`assaygraph/?pk=${this.result1}`)
    .subscribe(data => {
        console.log(data)
        this.node=data["node"],
        this.link=data["links"]
        console.log(this.node)
        console.log(this.node)
        console.log(this.link[0])
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
    getNetworkData2() {
      if (this.echart !== undefined) {
        this.echart.showLoading();
      }
      this.restservice.getDataList4(`assaygraphpng/?pk=${this.result1}`)
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
          this.getNetworkData2();
        }
        else{this.getNetworkData();}
           
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
            this.router.navigate(['/searchmmp/',this.id])
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
        this.key='MW:'+this.mwMin+'~'+this.mwMax+'+ALOGP:'+this.alogpMin+'~'+this.alogpMax+'+HBD:'+this.hbdMin+'~'+this.hbdMax+'+HBA:'+this.hbaMin+'~'+this.hbaMax+'+ROTB:'+this.rtbMin+'~'+this.rtbMax+'+PSA:'+this.psaMin+'~'+this.psaMax+'+AROM:'+this.aromMin+'~'+this.aromMax+'+ALERTS:'+this.alertsMin+'~'+this.alertsMax+'+qed:'+this.qedMin+'~'+this.qedMax+'+sascore:'+this.sasMin+'~'+this.sasMax+'+npscore:'+this.npMin+'~'+this.npMax+'+freesasa:'+this.freeMin+'~'+this.freeMax+'+max_phase:'+this.phaseMin+'~'+this.phaseMax+'&ptype='+this.selected
        this.atr=this.result1+'&range='+this.key
        console.log(this.atr)
        if(this.showStructure==true){
          this.getNetworkData2();
        }
        else{this.getNetworkData();}
           }
    getBioactivites(){
      this.restservice.getDataList(`NPAct/?assay_id=${this.result1}`).subscribe(data=>{
          this.num=data["meta"]["total_results"]
      })
      this.restservice.getDataList(`DerAct/?assay_id=${this.result1}`).subscribe(data=>{
        this.num1=data["meta"]["total_results"]
    })
    this.isLoading2 = false;
    }
  private _getDrugs() {
    this.restservice.getDataList(`assayinfo/?assay_id=${this.result1}`)
    .subscribe(data => {
      console.log(data);
      this.images = data['assay_info_news'];
      // this.compounds=data["meta"]["total_results"]
      console.log(this.images);
    });
  }
 
  获取当前靶点的MMP
private _getDrugsb(page?, perPage?) {
  this.restservice.getDataList(`MMPAll/?assay_id=${this.result1}`, page, perPage)
  .subscribe(data => {
      this.images1=data['results'],
      this.count=data['count'],
      console.log(this.images1)
      this.isLoading = false;
  });
}
pageChange(event) {
  this.isLoading = true;
  this._getDrugsb(event.pageIndex, event.pageSize);
}
openDocDialog(moleculeChemblId: number | string) {
  this.dialog.open(DocCardComponent, {
    width: '800px',
    data: {
      moleculeChemblId: moleculeChemblId
    }
  })
}
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

}
