import Inject from 'app/core/decorators/inject';


@Inject('StateService') // eslint-disable-line new-cap

export default class App {
  constructor(stateService) {
    this.state = stateService;
  }
}
