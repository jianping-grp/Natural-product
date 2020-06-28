import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TableComponent} from './layout/main-content/table/table.component';
import {SearchComponent} from './layout/main-content/search/search.component';
import {ShouyeComponent} from './layout/shouye/shouye.component';
import {HelpComponent} from './layout/help/help.component';
import {DetailsComponent} from './layout/main-content/details/details.component';
import {TargetComponent} from './layout/main-content/Target/target/target.component';
import {TableTargetComponent} from './layout/main-content/table-target/table-target.component';
import {TableDerivativeComponent} from './layout/main-content/table-derivative/table-derivative.component';
import {SearchRComponent} from './layout/main-content/search-r/search-r.component';
import {SearchMmpComponent} from './layout/main-content/search-mmp/search-mmp.component';
import {BCompoundComponent} from './layout/main-content/Bioactivites/b-compound/b-compound.component';
import {BDerivativeComponent} from './layout/main-content/Bioactivites/b-derivative/b-derivative.component';
import {BTargetComponent} from './layout/main-content/Bioactivites/b-target/b-target.component';
import {BTargetDComponent} from './layout/main-content/Bioactivites/b-target-d/b-target-d.component';
import {ContactComponent} from './layout/main-content/contact/contact.component';
import {TableCompoundComponent} from './layout/main-content/table-compound/table-compound.component';
import {TargetPredictionComponent} from './layout/main-content/target-prediction/target-prediction.component';
import {ChemicalScreeningComponent} from './layout/main-content/chemical-screening/chemical-screening.component';
import {TPResultComponent} from './layout/main-content/t-p-result/t-p-result.component';
import {DerivativeComponent} from './layout/main-content/derivative/derivative.component';


const routes: Routes = [
  {
    path: '',
    component: ShouyeComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'compound-table/:id',
    component: TableComponent
  },
  {
    path: 'compound-table-name/:id',
    component: TableCompoundComponent
  },
  {
    path: 'target-table/:id',
    component: TableTargetComponent
  },
  {
    path: 'derivative-table/:id',
    component: TableDerivativeComponent
  },
  {
    path: 'compound/:id',
    component: DetailsComponent
  },
  {
    path: 'target/:id',
    component: TargetComponent
  },
  {
    path: 'Derivative/:id',
    component: DerivativeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path:'searchr',
    component:SearchRComponent
  },
  {
    path:'searchmmp/:id',
    component:SearchMmpComponent
  },
  {
    path:'BCompound/:id',
    component:BCompoundComponent
  },
  {
    path:'BDerivative/:id',
    component:BDerivativeComponent
  },

  {
    path:'BTarget/:id',
    component:BTargetComponent
  },
  {
    path:'BTargetD/:id',
    component:BTargetDComponent
  },
  {
    path:'contact',
    component:  ContactComponent
  },

  {
    path:'tp',
    component:    TargetPredictionComponent
  },
  {
    path:'cs',
    component:      ChemicalScreeningComponent 
  },
  {
    path:'tpr',
    component:  TPResultComponent
  },

  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
