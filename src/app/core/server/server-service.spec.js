import { ServerService } from './server-service';


describe('ServerService', () => {
  let endpoints;
  let httpBackend;
  let serverService;


  beforeEach(() => {
    endpoints = {
      BASE_URL: 'http://localhost:8000',
      RESOURCE_URL: 'http://localhost:8000/resource'
    };

    angular.mock.module($provide => {
      $provide.value('Endpoints', endpoints);
      $provide.service('ServerService', ServerService);
    });

    inject(($httpBackend, ServerService) => {
      httpBackend = $httpBackend;
      serverService = ServerService;
    });
  });


  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  describe('Getting resources', () => {
    it('should send GET request to server', () => {
      httpBackend.expectGET(endpoints.RESOURCE_URL).respond(200, []);
      serverService.get('/resource');
      httpBackend.flush();
    });

    it('should fulfill promise with an array of resources', () => {
      let responseData = [{}, {}];
      httpBackend.whenGET(endpoints.RESOURCE_URL).respond(200, responseData);

      serverService.get('/resource')
        .then(data => {
          expect(data).toEqual(responseData);
        });

      httpBackend.flush();
    });
  });


  describe('Creating a resource', () => {
    it('should send POST request to server', () => {
      let resource = {};
      httpBackend.expectPOST(endpoints.RESOURCE_URL, resource).respond(200);
      serverService.create('/resource', resource);
      httpBackend.flush();
    });

    it('should fulfill promise with the newly created resource', () => {
      let resource = {};
      httpBackend.whenPOST(endpoints.RESOURCE_URL).respond(200, resource);

      serverService.create('/resource', resource)
        .then(data => {
          expect(data).toEqual(resource);
        });

      httpBackend.flush();
    });
  });


  describe('Deleting a resource', () => {
    it('should send DELETE request to server', () => {
      httpBackend.expectDELETE(`${endpoints.RESOURCE_URL}/123`).respond(204);
      serverService.delete('/resource/123');
      httpBackend.flush();
    });
  });


  describe('Updating a resource', () => {
    it('should send PUT request to server', () => {
      let resource = {};
      httpBackend.expectPUT(`${endpoints.RESOURCE_URL}/123`, resource).respond(200);
      serverService.update('/resource/123', resource);
      httpBackend.flush();
    });

    it('should fulfill promise with the updated resource', () => {
      let resource = {};
      httpBackend.whenPUT(`${endpoints.RESOURCE_URL}/123`, resource).respond(200, resource);

      serverService.update('/resource/123', resource)
        .then(data => {
          expect(data).toEqual(resource);
        });

      httpBackend.flush();
    });
  });

});
