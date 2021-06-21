import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {JsmeComponent} from '../../../../jsme/jsme/jsme.component';
@Component({
  selector: 'app-scaffold-search',
  templateUrl: './scaffold-search.component.html',
  styleUrls: ['./scaffold-search.component.css']
})
export class ScaffoldSearchComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  jsmeSmiles: string;
  structureTypes = ['scaffold', 'framework'];
  structureType = this.structureTypes[0];
  constructor(
    private router:Router
  ) { 
    
  }

  ngOnInit() {
    this.jsmeSmiles = 'O=C(C[n+]1ccccc1)c1ccccc1';
  }
  getJsmeSmiles() {
    this.jsmeSmiles = this.jsme.smiles;
  }
  onSubmit(smiles: string) {
    this.jsme.smiles=this.jsmeSmiles
      // if (this.structureType === 'Structure') {
        this.router.navigate(['/scaffoldr/'], {queryParams: {
          structureType: this.structureType,
          smiles: this.jsme.smiles,
        }});
      // } 
    //   else if(this.structureType === 'MMP'){
    //     this.jsme.smiles=`?pk="${this.jsme.smiles}"`
    //     this.router.navigate(['/searchmmp/', this.jsme.smiles
    //     ])
    // }
    }
}
