import { NewAutomlService } from './new-automl.service';

import { NewAutomlComponent } from './new-automl.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAutomlRoutingModule } from './new-automl-routing.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutomlDragDropModule } from './automl-drag-drop/automl-drag-drop.module';
import { ControllerSelectionComponent } from './controller-selection/controller-selection.component';

@NgModule({
  declarations: [
    NewAutomlComponent,
    ControllerSelectionComponent
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    NewAutomlRoutingModule,
    DragDropModule ,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AutomlDragDropModule
  ],
  exports: [NewAutomlComponent],
  providers: [NewAutomlService]
})
export class NewAutomlModule { }
