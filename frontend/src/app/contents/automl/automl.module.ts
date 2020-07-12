/*the urls of the services that this module and its components and submodels uses is defined in contents/automl/new-automl/constants.ts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

import { RouterModule } from '@angular/router';
import { NewAutomlModule } from './new-automl/new-automl.module';

import { AutomlComponent } from './automl.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomlRoutingModule } from './automl-routing.module';
import { ViewAutomlComponent } from './view_automl/view-automl/view-automl.component';


@NgModule({
  declarations: [
    AutomlComponent,
    ViewAutomlComponent
  ],
  imports: [
    CommonModule,
    AutomlRoutingModule,
    NewAutomlModule
  ],
  exports: [AutomlComponent]
})
export class AutomlModule { }
