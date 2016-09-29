import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';

import { Car } from './car';

@Component({
    selector: 'my-hero-detail',
    moduleId: module.id,
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
    car: Car;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ){}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.heroService.getCar(id)
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