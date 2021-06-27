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
    this.jsmeSmiles = 'O=C(C[n+]1cc(Br)cc(Br)c1)c1ccc(Cl)cc1.[Br-]';
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
