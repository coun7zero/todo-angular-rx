import { App } from './app';


describe('AppController', () => {
  let controller;
  let routerService;


  beforeEach(() => {
    inject(($controller) => {
      routerService = {};

      controller = $controller(App, {
        RouterService: routerService
      });
    });
  });


  describe('Initialization', () => {
    it('should set `controller.state` with routerService', () => {
      expect(controller.state).toBe(routerService);
    });
  });

});
