import { take } from 'rxjs/operators';
import { Constants } from './new-automl/constants';
import { Generic } from './new-automl/generic';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AutomlService {

  constructor(private http: HttpClient) { }

  default_components = {
    
    'file':{
      'id':1,
      'initials':'File',
      'name':'File',
      'type':'file',
    },

    'preprocessor':{
      'id':0,
      'initials':'Prepro',
      'name':'PrePro',
      'type':'preprocessor_default',
    },

    'model':{
      'id':0,
      'initials':'Model',
      'name':'Model',
      'type':'model_default',
    },

    'metric':{
      'id':0,
      'initials':'Metric',
      'name':'Metric',
      'type':'metric_default',
    },

    'seta':{
      'id':0,
      'initials':'seta',
      'name':'seta',
      'type':'seta'
    }

  };

  get_default_components(name:string=""){
    if(name == "")
      return this.default_components;
    
    return this.default_components[name];
  }

  get_component_img_url(item:Generic){
    return `assets/img/${item.type}.png`;
  }

  get_automl_result(automlrequest_id: number){
    return this.http.get<any>(Constants.url_get_automl_result(automlrequest_id)).pipe(take(1));
  }

  get_all_automls(){
    return this.http.get<any>(Constants.url_get_all_automls).pipe(take(1));
  }

}
