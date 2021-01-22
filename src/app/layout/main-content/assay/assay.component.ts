import { Component, OnInit , ViewChild,ElementRef ,Input} from '@angular/core';
import {RestService} from '../../../service/rest/rest.service';
import {ActivatedRoute, ParamMap,Router,} from '@angular/router';
import {PageMeta} from '../../../models/page-meta';
import {Observable} from 'rxjs';
import {Node} from '../../../models/node';
import {Link} from '../../../models/link';
import {MatDialog} from '@angular/material';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {CompoundCardComponent} from '../../../share/card/compound-card/compound-card.component';
@Component({
  selector: 'app-assay',
  templateUrl: './assay.component.html',
  styleUrls: ['./assay.component.css']
})
export class AssayComponent implements OnInit {
  result1: string;
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
  showLabel = false;
  showDynamicNetwork = false;
  series: any;
  private echart;
  public echartOptions:{};
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
              const nameId = el.data['name'].split('-')
              console.log(nameId)
              
                return `Database ID: ${nameId[0]}</br>` +
                  `Act Value: ${nameId[1]}</br>` +
                  `Mol Weight: ${nameId[2]}</br> `+`SlogP:${nameId[3]}</br>`;
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
            const nameId = el.data['name'].split('-');
            return nameId[0];
          },
          position: 'top',
        },
          show: this.showLabel,
          position: "bottom",
          color:'#33ffcc'
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
          fontSize: 20
      },
      focusNodeAdjacency: true,
    //   nodes:this.node
    // ,
    //   links:this.link
    // ,

      lineStyle: {
        color:'#009999',
          opacity: 0.9,
          width: 5,
          curveness: 0,
          type: 'solid'
      }
  }
    this.echartOptions={title: {
      text: 'Network-table'
  },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [this.series ]}   
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
    this.http.get(`http://172.16.41.157:9004/assaygraph/?pk=CHEMBL1794345`)
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

  

  private _getDrugs() {
    this.restservice.getDataList(`assayinfo/?search=CHEMBL1794345`)
    .subscribe(data => {
      this.images = data['assay_infos'];
      // this.compounds=data["meta"]["total_results"]
      console.log(this.images);
    });
  }
  showNodeLabel() {
    this.series.label.normal.show = this.showLabel;
    this.echart.setOption(this.echartOptions);
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
    const nameId = event.data['name'].split('-');
    // return nameId[0];
    this.openDialog(nameId[0]);
    console.log(nameId[0])
  }
  openDialog(moleculeChemblId: number | string){
    this.dialog.open(CompoundCardComponent, {
      width: '800px',
      data: {
        moleculeChemblId: moleculeChemblId
      }
    })
  }
}
