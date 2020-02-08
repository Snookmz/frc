import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {PitComponent} from './pit/pit.component';
import {ScoutComponent} from './scout/scout.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {QrComponent} from './qr/qr.component';
import {DataComponent} from './data/data.component';
import {LoginComponent} from './login/login.component';
import {SetupComponent} from './setup/setup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {path: 'data', component: DataComponent},
  {path: 'login', component: LoginComponent},
  {path: 'pit', component: PitComponent},
  {path: 'scout', component: ScoutComponent},
  {path: 'setup', component: SetupComponent},
  {path: 'qr', component: QrComponent},
  {
    path: 'main',
    component: MainComponent,
    children: [
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
