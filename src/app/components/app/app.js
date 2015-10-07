import { Inject } from 'app/core/decorators/inject';


@Inject('StateService')
export class App {
  constructor(stateService) {
    this.state = stateService;
  }
}
