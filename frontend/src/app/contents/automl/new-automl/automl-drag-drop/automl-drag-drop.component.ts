import { AutomlService } from './../../automl.service';
import { NewAutomlService } from './../new-automl.service';
import { GenericList } from './../generic_list';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Generic } from './../generic';
@Component({
  selector: 'app-drag-drop',
  templateUrl: './automl-drag-drop.component.html',
  styleUrls: ['./automl-drag-drop.component.css']
})
export class AutomlDragDropComponent implements OnInit {

  tab:string = 'none';

  preprocessorsListCount = 0;

  preprocessors: Generic[];
  models: Generic[];
  metrics: Generic[];

  @Output() pipelineChanged = new EventEmitter<any>();

  

  defaults:any={};

  seta:GenericList; 

  list:GenericList[] = [];

  constructor(
    private newAutomlService: NewAutomlService,
    private automlService: AutomlService
  ) { 
    this.defaults = automlService.get_default_components();
    
    this.list = [
      {
        'type':'files',
        'list':[
          this.defaults['file']
        ]
      },
      {
        'type':'seta',
        'list':[
          this.defaults['seta']
        ]
      },
      {
        'type':'preprocessors',
        'list':[
          this.defaults['preprocessor']
        ]
      },
      {
        'type':'seta',
        'list':[
          this.defaults['seta']
        ]
      },
      {
        'type':'models',
        'list':[
          this.defaults['model']
        ]
      },
      {
        'type':'seta',
        'list':[
          this.defaults['seta']
        ]
      },
      {
        'type':'metrics',
        'list':[
          this.defaults['metric']
        ]
      }
    ];

    this.seta = {
      'type':'seta',
      'list':[
        this.defaults['seta']
      ]
    };
  }

  ngOnInit() {
    //populing the modelers and preprocessors arrays
    this.newAutomlService.getPreprocessors().subscribe(pre => this.preprocessors = this.addTypeTOGeneric(pre,'preprocessor'));
    this.newAutomlService.getModelers().subscribe(mod => this.models = this.addTypeTOGeneric(mod,'model'));
    this.newAutomlService.getMetrics().subscribe(met => {this.metrics = this.addTypeTOGeneric(met,'metric');});

    
  }

  addTypeTOGeneric(vector:Generic[],type:string){
    let new_vector:Generic[] = [];
    for(let item of vector){
      item.type = type;
      new_vector.push(item);
    }

    return new_vector;

  }

  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }

  switch(array:any[],i:number,j:number){
    let aux:any = array[i];
    array[i] = array[j];
    array[j] = aux;
  }
  //este metodo lida quando dropa um elemento de preprocessador no pipeline
  dropPreprocessorPipeline(event: CdkDragDrop<string[]>){
    //Versao complexa
    /*
    let preprocessorAux = event.previousContainer.data[ event.previousIndex ];
      

    //vendo se o container atual eh um de preprocessadores
    if(  this.list[event.container.id].type == 'preprocessors' ){
      //se ha o elemento default
      if(this.list[event.container.id].list[0].id == 0){
        this.list[ event.container.id ].list = [event.previousContainer.data[ event.previousIndex ] ];
      }else{
        this.list[event.container.id].list.push( event.previousContainer.data[ event.previousIndex ] );
        this.list[event.container.id].list = this.list[event.container.id].list.filter( this.onlyUnique );
      }
      
    }else if(this.preprocessorsListCount == 0){
      this.list['2'].list =  [event.previousContainer.data[ event.previousIndex ] ];
      this.preprocessorsListCount = this.preprocessorsListCount+1;
    }
    else{

      if(this.list.length >= 11)
        return;
      
      let container_id = +event.container.id;

      if(container_id > this.list.length -4){
        container_id=this.list.length-4;
      }
        

      if(container_id == 0 ){
        container_id = 1;
      }

      this.list.push(this.seta);
      moveItemInArray(this.list,this.list.length-1,container_id);

      let aux = {
        'type':'preprocessors',
        'list':[]
      };
      aux.list.push(preprocessorAux);
      this.list.push(aux);
      moveItemInArray(this.list,this.list.length-1,container_id+1);

      this.preprocessorsListCount = this.preprocessorsListCount+1;
    }*/

    //Versao Simples
    //a segunda condicao eh para ver se o elemento que esta no vetor de modelos nao eh apenas o default
    if(  this.list[event.container.id].type == 'preprocessors' && this.list[event.container.id].list[0].id != 0){
      this.list[event.container.id].list.push( event.previousContainer.data[ event.previousIndex ] );
      this.list[event.container.id].list = this.list[event.container.id].list.filter( this.onlyUnique );
    }else{

      this.list[ (this.list.length -5) + "" ].list = [event.previousContainer.data[ event.previousIndex ] ];
    }
  }

  //este metodo lida quando dropa um elemento de model no pipeline
  dropModelPipeline(event: CdkDragDrop<string[]>){
    //a segunda condicao eh para ver se o elemento que esta no vetor de modelos nao eh apenas o default
    if(  this.list[event.container.id].type == 'models' && this.list[event.container.id].list[0].id != 0){
      this.list[event.container.id].list.push( event.previousContainer.data[ event.previousIndex ] );
      this.list[event.container.id].list = this.list[event.container.id].list.filter( this.onlyUnique );
    }else{

      this.list[ (this.list.length -3) + "" ].list = [event.previousContainer.data[ event.previousIndex ] ];
    }
  }

  //este metodo lida quando dropa um elemento de metric no pipeline
  dropMetricPipeline(event: CdkDragDrop<string[]>){

    this.list[ (this.list.length -1) + "" ].list[0]= event.previousContainer.data[ event.previousIndex ] ;

  }
  
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if( event.previousContainer.id == 'preprocessors' ){
      this.dropPreprocessorPipeline(event);
    }

    if( event.previousContainer.id == 'models' ){
      this.dropModelPipeline(event);
    }

    if(event.previousContainer.id == 'metrics'){
      this.dropMetricPipeline(event);
    }
    //this.switch(this.list, event.previousIndex, event.currentIndex);

    this.emitsPipelineChanged();
  }

  dropTrash(event: CdkDragDrop<string[]>) {
    let id = event.previousContainer.id;
    if( id == 'preprocessors' || id == 'models' || id == 'metrics' ){
      return;
    }
    //se esta revomendo a metrica
    if(+id == this.list.length-1){
      this.list[ id].list[0]= this.defaults["metric"];
      return;
    }
    //se esta removendo um modelo
    if(+id == this.list.length-3){
      //se tinha apenas um item na lista de modelos
      if(this.list[id].list.length == 1){
        this.list[id].list[0]= this.defaults["model"];
      }else{
        this.list[id].list.splice(event.previousIndex,1);
      }
      return;
    }

    //se esta removendo um preprocessor na versao simples
    if(+id == this.list.length-5){
      //se tinha apenas um item na lista de modelos
      if(this.list[id].list.length == 1){
        this.list[id].list[0]= this.defaults["preprocessor"];
      }else{
        this.list[id].list.splice(event.previousIndex,1);
      }
      return;
    }
    
    /*Versao Complexa do Preprocessor
    //se chegou ate aqui quer dizer que esta removendo um preprocessor do pipeline

    //se nao tem so o elemento que esta sendo removido
    if(this.list[id].list.length != 1){
      this.list[id].list.splice(event.previousIndex,1);

    }
    else if(this.preprocessorsListCount <= 1){ //se tem apenas uma lista de preprocessor no pipeline
      this.list[id].list[0]= this.defaults.preprocessor;
      console.log(this.defaults.preprocessor);
      this.preprocessorsListCount = 0;
    }else{
      this.preprocessorsListCount = this.preprocessorsListCount - 1;
      this.list.splice(+id,2);
    }

  */

  this.emitsPipelineChanged();
  }

  loadimg(item){
    return this.automlService.get_component_img_url(item);
  }

  isNotLast(i){
    if(i+1 == this.list.length){
      return false;
    }
    return true;
  }
  canDrag(item,i){
    if(i%2==0)
      return true;
    return false; 
  }

  changeTab(newTab:string){
    if(this.tab == newTab)
      this.tab = 'none';
    else
      this.tab = newTab;
  }

  validPipeline(){
    let valid:boolean = true;
    //metric validation
    let aux = this.list[2].list[0];
    if(aux.id == 0)
      valid = false;
    //models validation
    aux = this.list[this.list.length-3].list[0];
    if(aux.id == 0)
      valid = false;
    //preprocessors validation
    aux = this.list[this.list.length-5].list[0];
    if(aux.id == 0)
      valid = false;
    return valid;
  }

  /*
  this deals with the selectable preprocessor/models/metrics when it is handled, to fix the visualization,
  work together with the onSelectableDropped
  */ 
  onSelectableHandle(array:any[],index:number){
  
    array.push(array[index]);
    moveItemInArray(array,array.length-1,index);

  }

  /*
  this deals with the selectable preprocessor/models/metrics when it is dropped, to fix the visualization,
  work together with the onStandardHandle
  */ 
  onSelectableDropped(array:any[],index:number){

    moveItemInArray(array,index, array.length-1);
    array.pop();

  }

  /*
  This function emits the output pipeline_changed with the actually pipeline when its called
   */
  emitsPipelineChanged(){
    this.pipelineChanged.emit({
      'models':this.list[ (this.list.length -3) ].list,
      'preprocessors':this.list[ (this.list.length -5) ].list,
      'metrics':this.list[this.list.length-1].list,
      'pipeline_valid':this.validPipeline()
    });
  }
}


