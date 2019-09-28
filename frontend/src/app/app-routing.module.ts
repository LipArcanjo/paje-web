import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent} from './contents/home/home.component';
import { DataExplorationComponent } from './contents/data-exploration/data-exploration.component';
import { AutomlComponent } from './contents/automl/automl.component';
import { ModelAnalysisComponent } from './contents/model-analysis/model-analysis.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'data-exploration', component: DataExplorationComponent },
  { path: 'automl', component: AutomlComponent },
  { path: 'model-analysis', component: ModelAnalysisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
