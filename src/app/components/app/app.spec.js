import App from './app';


describe('AppController', () => {
  let controller;
  let stateService;


  beforeEach(() => {
    inject(($controller) => {
      stateService = {};

      controller = $controller(App, {
        StateService: stateService
      });
    });
  });


  describe('Initialization', () => {
    it('should set `controller.state` with stateService', () => {
      expect(controller.state).toBe(stateService);
    });
  });

});
