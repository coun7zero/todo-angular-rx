TaskService.$inject = [
  '$injector',
  '$log',
  'storageConfig'
];

export default function TaskService($injector, $log, storageConfig) {
  $log.info('STORAGE_STRATEGY:', storageConfig.STORAGE_STRATEGY);
  return $injector.get(storageConfig.STORAGE_STRATEGY);
}
