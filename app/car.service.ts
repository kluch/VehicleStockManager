import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Car } from './car';


@Injectable()
export class CarService {
    private heroesUrl = 'app/heroes';  // URL to web api    
    private headers = new Headers({'Content-Type': 'application/json'});
      
    constructor(private http: Http) { }
   
    getCars():  Promise<Car[]> {
        return this.http.get('http://localhost:4000/carlist')
               .toPromise()
               .then(response => response.json() as Car[])
               .catch(this.handleError);
    }//stub

    getCar(id: string): Promise<Car> {
        return this.getCars()
                .then(cars => cars.find(car => car._id === id));
    }

    create(newCar: Object): Promise<Car> {
        return this.http
        .post('http://localhost:4000/addcar', JSON.stringify(newCar), {headers: this.headers})
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);
    }

    delete(id: number): Promise<void>{
        let url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}