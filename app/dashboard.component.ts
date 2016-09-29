import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'

import {Car} from './car';
import {HeroService} from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})

export class DashboardComponent implements OnInit{
    cars: Car[] = [];

    constructor(private heroService: HeroService,
    private router: Router){}

    ngOnInit(): void {
        this.heroService.getCars()
        .then(heroes => this.cars = heroes);
    }

    gotoDetail(car: Car): void {
        let link = ['/detail', car._id];
        this.router.navigate(link);
    }

}