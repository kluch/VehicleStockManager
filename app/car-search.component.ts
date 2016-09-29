import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CarSearchService } from './car-search.service';

import { Car } from './car';


@Component({
    moduleId: module.id,
    selector: 'car-search',
    templateUrl: 'car-search.component.html',
    styleUrls : ['car-search.component.css'],
    providers: [CarSearchService]
})
export class CarSearchComponent implements OnInit {
    cars: Observable<Car[]>;
    private searchTerms = new Subject<string>();
    
    constructor(
        private carSearchService: CarSearchService,
        private router: Router
    ) { }

    //push a search term into the Observable stream
    search(term: string): void{
        this.searchTerms.next(term);
    }

    ngOnInit() { 
        this.cars = this.searchTerms
        .debounceTime(300) // wait for 300ms pause in events
        .distinctUntilChanged() // ignore if next search term is same as previous
        .switchMap(term => term // switch to new observable each time
        // return the http search observable
        ? this.carSearchService.search(term)
        // or the observable of empty heroes if no search term
        :Observable.of<Car[]>([]))
        .catch(error => {
            console.log(error);
            return Observable.of<Car[]>([]);
        });
    }

    gotoDetail(car: Car): void{
        let link = ['/detail', car._id];
        this.router.navigate(link);
    }

}