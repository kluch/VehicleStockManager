import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'

import {Car} from './car';
import {CarService} from './car.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css' ]
})

export class DashboardComponent implements OnInit{
    cars: Car[] = [];

    constructor(private carService: CarService,
    private router: Router){}

    ngOnInit(): void {
        this.carService.getCars()
        .then(cars => this.cars = cars);
    }
}