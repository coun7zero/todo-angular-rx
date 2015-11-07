import { Inject } from 'modules/decorators/inject';


@Inject('RouterService')
export class App {
  constructor(routerService) {
    this.state = routerService;
  }
}
