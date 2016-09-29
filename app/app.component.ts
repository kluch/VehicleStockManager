import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <nav>
        <a routerLink="/dashboard" routerLinkActive="active">View All Stock</a>
        <a routerLink="/cars" routerLinkActive="active">Add Stock</a>
        <a routerLink="/search" routerLinkActive="active">Search Stock</a>
    </nav>
    <router-outlet></router-outlet>
    `,
    styleUrls: ['app/app.component.css']
})

export class AppComponent{
    title = 'Car Stock Manager';
}