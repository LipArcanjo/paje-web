import { NewAutomlModule } from './new-automl/new-automl.module';
import { ViewAutomlComponent } from './view_automl/view-automl/view-automl.component';
import { AutomlComponent } from './automl.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: AutomlComponent},
  {path: 'new', loadChildren: () => NewAutomlModule},
  {path: ':id', component: ViewAutomlComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomlRoutingModule { }
