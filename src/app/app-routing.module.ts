import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {PitComponent} from './main/pit/pit.component';
import {ScoutComponent} from './main/scout/scout.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {componentFactoryName} from '@angular/compiler';
import {QrComponent} from './main/qr/qr.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  // },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {path: 'pit', component: PitComponent},
      {path: 'scout', component: ScoutComponent},
      {path: 'qr', component: QrComponent}
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
