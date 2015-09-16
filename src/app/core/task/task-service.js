TaskService.$inject = [
  '$injector',
  '$log',
  'storageStrategy'
];

export default function TaskService($injector, $log, storageStrategy) {
  $log.info('API:', storageStrategy);
  return $injector.get(storageStrategy);
}
