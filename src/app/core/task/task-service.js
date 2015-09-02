TaskService.$inject = [
  '$injector',
  '$log',
  'apiType'
];

export default function TaskService($injector, $log, apiType) {
  $log.info('API:', apiType);
  return $injector.get(apiType);
}
