import { Controller } from './controller';
import { NewAutomlService } from './new-automl.service';
import { Generic } from './generic';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttrAst } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-automl',
  templateUrl: './new-automl.component.html',
  styleUrls: ['./new-automl.component.css']
})
export class NewAutomlComponent implements OnInit {

  tab:number = 0;
  max_tab:number = 1;

  //this is the components selected in the pipeline
  pipeline_models:Generic[] = [];
  pipeline_preprocessors:Generic[] = [];
  pipeline_metrics:Generic[] = [];
  pipeline_controller:Controller;

  pipeline_valid:boolean = false;
  show_erro:boolean = false;
  show_erro_file = false;
  controller_selected_id:number = 0;

  db_file:File = null;
  db_file_name:string = "Choose File";
  

  constructor( 
    private newAutomlService: NewAutomlService,
    private router : Router
  ) {

  }

  ngOnInit() {

  }

  nextTab(){
    if(this.db_file != null && this.pipeline_controller != null){
      this.tab++;
      this.show_erro = false;
      this.show_erro_file = false;
    }else{
      this.show_erro = true;
    }
    
  }

  previousTab(){
    this.tab--;
    this.show_erro = false;
    this.show_erro_file = false;

    this.db_file_name = "Choose File";
    if(this.db_file != null){
      this.db_file_name = this.db_file.name;
    }

    this.pipeline_metrics = [];
    this.pipeline_models = [];
    this.pipeline_preprocessors = [];
    this.pipeline_valid = false;
  }

  cancel(){
    this.router.navigate(['/automl']);
  }

  async confirm(){
    if(this.db_file != null && this.pipeline_controller != null && this.pipeline_valid){
      let aux = await this.newAutomlService.addNewAutoMLRequest(
        this.pipeline_models,this.pipeline_preprocessors,this.pipeline_metrics,this.db_file, this.pipeline_controller);
      aux.subscribe(test => {console.log(test)});
      this.router.navigate(['/automl']);
    }else{
      this.show_erro = true;
      this.show_erro_file = false;
    }
    
 
  }

  onFileChange(event){

    const tmp:File = event.srcElement.files[0];
    
    if(this.newAutomlService.checkFile(tmp)){
      this.db_file = tmp;
      this.db_file_name = this.db_file.name;
      this.show_erro_file = false;
    }else{
      this.show_erro_file = true;
      this.db_file = null;
      this.db_file_name = "Choose File";
    }
    
  }

  controllerSelected(controller){
    this.pipeline_controller = controller;
    this.controller_selected_id = controller.id;
  }

  pipelineChanged(event){
    this.pipeline_metrics = event.metrics;
    this.pipeline_models = event.models;
    this.pipeline_preprocessors = event.preprocessors;
    this.pipeline_valid = event.pipeline_valid;
    console.log(event);
    //dont using the pipeline_valid of the event, see the console.log in execution to understand
  }
}
