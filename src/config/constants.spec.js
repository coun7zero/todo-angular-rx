import { ActionTypes, Endpoints } from './constants';

describe('Constants', () => {
  describe('ActionTypes', () => {
    it('should define a string constant for each action types', function(){
      expect(typeof ActionTypes.CREATE_TASK).toBe('string');
      expect(typeof ActionTypes.DELETE_TASK).toBe('string');
      expect(typeof ActionTypes.UPDATE_TASK).toBe('string');
    });
  });

  describe('Endpoints', () => {
    it('should define a base URL for the server', function(){
      expect(typeof Endpoints.BASE_URL).toBe('string');
    });
  });
});

