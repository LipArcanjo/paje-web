import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomlDragDropComponent } from './automl-drag-drop.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AutomlDragDropComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [AutomlDragDropComponent]
})
export class AutomlDragDropModule { }
