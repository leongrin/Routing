import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {UsersComponent} from '../users/users.component';
import {UserComponent} from '../users/user/user.component';
import {ServersComponent} from '../servers/servers.component';
import {ServerComponent} from '../servers/server/server.component';
import {EditServerComponent} from '../servers/edit-server/edit-server.component';
import {AuthGuard} from '../auth.guard';
import {CanDeactivateGuard} from '../servers/edit-server/can-deactivate.guard';
import {ErrorPageComponent} from '../error-page/error-page.component';
import {ServerResolverService} from '../servers/server-resolver.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent}
    ]},
  { path: 'servers', /*canActivate: [AuthGuard]*/ canActivateChild: [AuthGuard] , component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolverService} },
      { path: ':id/edit', canDeactivate: [CanDeactivateGuard], component: EditServerComponent }
    ]},
  /*{path: 'not-found', component: PageNotFoundComponent },*/
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'} },
  { path: '**', redirectTo: '/not-found'}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
