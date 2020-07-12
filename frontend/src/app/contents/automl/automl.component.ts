import { AutomlService } from './automl.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-automl',
  templateUrl: './automl.component.html',
  styleUrls: ['./automl.component.css']
})
export class AutomlComponent implements OnInit {

  constructor(private automlService:AutomlService) { }

  automls:any[];

  ngOnInit() {
    this.automlService.get_all_automls().subscribe( ret => {this.automls = ret; console.log(ret)} );
  }



}
