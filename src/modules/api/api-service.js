import { Inject } from 'modules/decorators/inject';


@Inject('$http', 'Endpoints')
export class APIService {
  constructor($http, Endpoints) {
    this.http = $http;
    this.baseUrl = Endpoints.BASE_URL;
  }

  get(path) {
    return this.http.get(`${this.baseUrl}${path}`)
      .then(response => response.data);
  }

  create(path, data) {
    return this.http.post(`${this.baseUrl}${path}`, data)
      .then(response => response.data);
  }

  delete(path) {
    return this.http.delete(`${this.baseUrl}${path}`);
  }

  update(path, data) {
    return this.http.put(`${this.baseUrl}${path}`, data)
      .then(response => response.data);
  }
}
