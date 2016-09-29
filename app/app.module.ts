import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { CarDetailComponent } from './car-detail.component';
import { CarComponent } from './car.component';
import { CarService }         from './car.service';
import {DashboardComponent} from './dashboard.component';
import {CarSearchComponent} from './car-search.component';

import {routing} from './app.routing';

import { AppComponent }  from './app.component';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
   ],
  declarations: [ 
    AppComponent,
    CarDetailComponent,
    CarComponent,
    DashboardComponent,
    CarSearchComponent
  ],
  providers: [CarService],
  bootstrap: [ AppComponent ]
  
})
export class AppModule { }
