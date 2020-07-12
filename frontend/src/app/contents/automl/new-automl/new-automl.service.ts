import { Controller } from './controller';
import { Generic } from './generic';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Constants } from './constants';


@Injectable()
export class NewAutomlService {

  constructor(private http: HttpClient) { }

  //dont comunicate with the server still
  getPreprocessors(){
    return this.http.get<Generic[]>(Constants.url_get_preprocessors).pipe(take(1));
  }

  getModelers(){
    return this.http.get<Generic[]>(Constants.url_get_modelers).pipe(take(1));
  }

  //dont comunicate with the server still
  getMetrics(){
    return this.http.get<Generic[]>(Constants.url_get_metrics).pipe(take(1));
  }

  getControllers(){
    return this.http.get<Controller[]>(Constants.url_get_controllers).pipe(take(1));
  }

  //check if the file is really a database file
  checkFile(file:File){
    let file_name: string = file.name;
    let array_of_split:string[] = file_name.split('.');
    let file_type:string = array_of_split[array_of_split.length-1];

    
    if(file_type == "arff" || file_type == "csv"){

      return true;
       
    }
    return false;
  }
  //this is necessary to convert the file, to send him with json
  getBase64(file) {

    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });

 }


  async addNewAutoMLRequest(models:Generic[],preprocessors:Generic[], metrics:Generic[],db_file:File, controller:Controller){

    var aux = await this.getBase64(db_file);
  
    let post_body = {
      'models' : models,
      'preprocessors':preprocessors,
      'metrics':metrics,
      'db_file': aux,
      'db_file_name': db_file.name,
      'controller':controller
    };


    console.log(post_body);

    return this.http.post(Constants.url_add_new_automl, post_body).pipe(take(1));
  }

  //dont work
  uploadFile(file:File){

    /*const formData  = new FormData();

    formData.append('file',file,file.name);

    const request = new HttpRequest('POST', Constants.url_upload_file , formData );
    return this.http.request(request);return true;*/

    return true;

  }
  
}
