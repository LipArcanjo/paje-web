import { NewAutomlService } from './../new-automl.service';
import { Controller } from './../controller';
import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-controller-selection',
  templateUrl: './controller-selection.component.html',
  styleUrls: ['./controller-selection.component.css']
})
export class ControllerSelectionComponent implements OnInit {

  constructor(private newAutomlService: NewAutomlService) { }

  @Input() controller_selected_id:number;

  controllers:Controller[] = [];

  @Output() controllerSelected:EventEmitter<Controller> = new EventEmitter<Controller>();

  ngOnInit() {
    this.newAutomlService.getControllers().subscribe(con => this.controllers = con);
  }

  changeControllerSelected(id:number){
    this.controller_selected_id = id;
    //finding the controller with the id
    let controller_aux;
    for(let c of this.controllers){
      if(c.id == (id)){
        controller_aux = c;
      }
    }
    this.controllerSelected.emit(controller_aux);
  }

}
