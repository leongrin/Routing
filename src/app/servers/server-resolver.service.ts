import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServersService} from './servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}


@Injectable({
  providedIn: 'root'
})

export class ServerResolverService implements Resolve<Server> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serverServ.getServer(+route.params['id']);
  }

  constructor(private serverServ: ServersService) { }
}
