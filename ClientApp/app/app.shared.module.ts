import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { SignalRComponent } from './components/signalr/signalr.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        SignalRComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'signalr', pathMatch: 'full' },
            { path: 'signalr', component: SignalRComponent },
            { path: '**', redirectTo: 'signalr' }
        ])
    ]
})
export class AppModuleShared {
}
