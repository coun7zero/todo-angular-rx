TaskService.$inject = [
  '$injector',
  '$log',
  'storageStrategy'
];

export default function TaskService($injector, $log, storageStrategy) {
  $log.info('STORAGE_STRATEGY:', storageStrategy);
  return $injector.get(storageStrategy);
}
