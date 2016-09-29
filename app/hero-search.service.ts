import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';

import {Hero} from './hero';
import {Car} from './car';

@Injectable()
export class HeroSearchService{
    constructor(private http: Http){}

    // search(term: string): Observable<Car[]>{
    //     return this.http
    //     .get(`app/heroes/?name=${term}`)
    //     .map((r: Response) => r.json().data as Car[]);
    // }

    search(term: string): Observable<Car[]>{
        return this.http
        .get(`http://localhost:4000/search?searchterm=${term}`)
        .map((r: Response) => r.json() as Car[]);
    }
}