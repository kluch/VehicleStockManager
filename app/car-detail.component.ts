import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { CarService } from './car.service';

import { Car } from './car';

@Component({
    selector: 'my-car-detail',
    moduleId: module.id,
    templateUrl: 'car-detail.component.html',
    styleUrls: ['car-detail.component.css']
})

export class CarDetailComponent implements OnInit {
    car: Car;

    constructor(
        private carService: CarService,
        private route: ActivatedRoute,
        private location: Location
    ){}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.carService.getCar(id)
            .then(car => this.car = car);
        });
    }

    goBack(): void {
        this.location.back();
    }

    // save(): void{
    //     this.heroService.update(this.car)
    //     .then(() => this.goBack());
    // }

}