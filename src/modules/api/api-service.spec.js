import { APIService } from './api-service';


describe('APIService', () => {
  let endpoints;
  let httpBackend;
  let apiService;


  beforeEach(() => {
    endpoints = {
      BASE_URL: 'http://localhost:8000',
      RESOURCE_URL: 'http://localhost:8000/resource'
    };

    angular.mock.module($provide => {
      $provide.value('Endpoints', endpoints);
      $provide.service('APIService', APIService);
    });

    inject(($httpBackend, APIService) => {
      httpBackend = $httpBackend;
      apiService = APIService;
    });
  });


  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  describe('Getting resources', () => {
    it('should send GET request to server', () => {
      httpBackend.expectGET(endpoints.RESOURCE_URL).respond(200, []);
      apiService.get('/resource');
      httpBackend.flush();
    });

    it('should fulfill promise with an array of resources', () => {
      let responseData = [{}, {}];
      httpBackend.whenGET(endpoints.RESOURCE_URL).respond(200, responseData);

      apiService.get('/resource')
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
      apiService.create('/resource', resource);
      httpBackend.flush();
    });

    it('should fulfill promise with the newly created resource', () => {
      let resource = {};
      httpBackend.whenPOST(endpoints.RESOURCE_URL).respond(200, resource);

      apiService.create('/resource', resource)
        .then(data => {
          expect(data).toEqual(resource);
        });

      httpBackend.flush();
    });
  });


  describe('Deleting a resource', () => {
    it('should send DELETE request to server', () => {
      httpBackend.expectDELETE(`${endpoints.RESOURCE_URL}/123`).respond(204);
      apiService.delete('/resource/123');
      httpBackend.flush();
    });
  });


  describe('Updating a resource', () => {
    it('should send PUT request to server', () => {
      let resource = {};
      httpBackend.expectPUT(`${endpoints.RESOURCE_URL}/123`, resource).respond(200);
      apiService.update('/resource/123', resource);
      httpBackend.flush();
    });

    it('should fulfill promise with the updated resource', () => {
      let resource = {};
      httpBackend.whenPUT(`${endpoints.RESOURCE_URL}/123`, resource).respond(200, resource);

      apiService.update('/resource/123', resource)
        .then(data => {
          expect(data).toEqual(resource);
        });

      httpBackend.flush();
    });
  });

});
