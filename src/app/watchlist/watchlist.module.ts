import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './watchlist.component';

const routes: Routes = [
    { path: '', component: WatchlistComponent }
];

@NgModule({
    declarations: [WatchlistComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class WatchlistModule { }