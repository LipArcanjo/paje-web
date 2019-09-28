import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { FooterNavComponent } from './footer-nav/footer-nav.component';
import {MatIconModule} from '@angular/material/icon';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// for http conection
import { HttpClientModule  } from '@angular/common/http';

// my components
// import { ToolbarNavComponent } from './toolbar-nav/toolbar-nav.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { ContentsComponent } from './contents/contents.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {MatTableModule} from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { DataExplorationComponent } from './contents/data-exploration/data-exploration.component';
import { AutomlComponent } from './contents/automl/automl.component';
import { ModelAnalysisComponent } from './contents/model-analysis/model-analysis.component';
import { HomeComponent } from './contents/home/home.component';
// import { MatPaginator } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    FooterNavComponent,
    SidebarNavComponent,
    ContentsComponent,
    NotfoundComponent,
    DataExplorationComponent,
    AutomlComponent,
    ModelAnalysisComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    // MatPaginator,
    MatTableModule
    // ChangeDetectorRef
    // MatTableDataSource
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
