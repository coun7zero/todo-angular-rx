const baseUrl = 'http://localhost:8000';

export const storageConfig = {
  LOCAL_STORAGE_KEY: 'TODO-APP',

  // LocalStorageStrategy | ServerStorageStrategy
  STORAGE_STRATEGY: 'LocalStorageStrategy',

  BASE_URL: baseUrl,

  TASKS_URL: baseUrl + '/tasks'
};
