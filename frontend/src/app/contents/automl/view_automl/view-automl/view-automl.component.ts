import { async } from '@angular/core/testing';
import { AutomlService } from './../../automl.service';
import { GenericList } from './../../new-automl/generic_list';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Generic } from '../../new-automl/generic';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-automl',
  templateUrl: './view-automl.component.html',
  styleUrls: ['./view-automl.component.css']
})
export class ViewAutomlComponent implements OnInit,OnDestroy {

  automlrequest_id:number;
  inscricao: Subscription;

  constructor(
    private route : ActivatedRoute,
    private automlService:AutomlService
  ) { 
  }

  seta:Generic;
  file:Generic;
  metric:Generic;

  pipeline:Generic[] = [];

  automl_result:any;

  async ngOnInit() {
    this.inscricao = this.route.params.subscribe( (params: any) =>{
      this.automlrequest_id = params['id'];
    });

    this.seta = this.automlService.get_default_components("seta");
    this.file = this.automlService.get_default_components("file");

    await this.automlService.get_automl_result(this.automlrequest_id).toPromise().then(ret => this.automl_result = ret);
    this.pipeline = this.automl_result["pipeline"];
    this.metric = this.pipeline[this.pipeline.length-1];
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  loadimg(item){
    return this.automlService.get_component_img_url(item);
    
  }

  get_pipeline_with_arrow(){
    let pipeline_with_arrow:Generic[] = [];
    pipeline_with_arrow.push(this.file);

    for(let i = 0; i < this.pipeline.length;i++){
      pipeline_with_arrow.push(this.seta);
      pipeline_with_arrow.push(this.pipeline[i]);

    }
    return pipeline_with_arrow;
  }


}
