import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {JsmeComponent} from '../../../../jsme/jsme/jsme.component';
@Component({
  selector: 'app-newmol-search',
  templateUrl: './newmol-search.component.html',
  styleUrls: ['./newmol-search.component.css']
})
export class NewmolSearchComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  jsmeSmiles: string;
  structureTypes = ['Scaffold', 'MMP'];
  structureType = this.structureTypes[0];
  
  constructor(
    private router:Router
  ) { 
    
  }

  ngOnInit() {
    this.jsmeSmiles = 'C[C@H](CCC(=O)O)[C@H]1CC[C@H]2[C@H]3[C@H](CC[C@@]21C)[C@@]1(C)CC[C@@H](O)C[C@H]1C[C@H]3O';
  }
  getJsmeSmiles() {
    this.jsmeSmiles = this.jsme.smiles;
  }
  onSubmit(smiles: string) {
      this.jsme.smiles=this.jsmeSmiles,
      this.router.navigate(['/newmolr/'], {queryParams: {
          structureType: this.structureType,
          smiles: this.jsme.smiles,
      }});
  }
}
